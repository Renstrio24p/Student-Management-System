import { Request, Response } from 'express';
import { User } from '../../models/users.model.ts';
import { MongooseError } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    // Ensure all fields are provided
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please provide email, password, and role' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Check if the provided role matches the user's role
        if (user.role !== role) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        // Respond with user details and token
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (err) {
        // Handle database or server errors
        if (err instanceof MongooseError) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        return res.status(500).json({ message: 'Server error', error: (err as MongooseError).message });
    }
};
