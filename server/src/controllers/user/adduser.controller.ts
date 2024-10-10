import { Request, Response } from "express";
import { User } from "../../models/users.model.ts";
import bcrypt from "bcryptjs";
import { Expression, Error as MongooseError } from "mongoose";
import { verifyLRN } from "../tokens/lrn.controller.ts"; // Assuming this file contains the LRN verification logic
import { verifyAccessToken } from "../tokens/accesToken.controller.ts";

// Updated addUserRouter function
export const addUserRouter = async (req: Request, res: Response): Promise<Expression> => {


    const { role, email, password, accessToken } = req.body;

    // Check role and verify access token if the role is Teacher or Admin

    if (role === 'Teacher' || role === 'Admin') {
        const isAccessTokenValid = await verifyAccessToken(req);
        console.log('isAccessTokenValid:', isAccessTokenValid);
        if (!isAccessTokenValid) {
            return res.status(403).json({ message: 'Forbidden: Invalid Access Token.' });
        }
    }

    // Verify LRN if the role is Student
    if (role === 'Student') {
        const isLrnValid = await verifyLRN(req);
        if (!isLrnValid) {
            return res.status(403).json({ message: 'Forbidden: Invalid LRN.' });
        }
    }

    const findExistingToken = await User.findOne({ accessToken });

    if (findExistingToken) {
        { role === 'Student' ? res?.status(400).json({ message: 'LRN is already taken' }) : res?.status(400).json({ message: 'Token is already taken' }) }
        return false;
    }

    // Check for required fields
    if (!role || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            role,
            email,
            password,
            accessToken,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Await for salt generation
        newUser.password = await bcrypt.hash(newUser.password, salt); // Await for password hashing

        const savedUser = await newUser.save(); // Save the new user

        // Send the response once
        return res.status(201).json(savedUser); // Use status 201 for created resource
    } catch (err) {
        if (err instanceof MongooseError) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};
