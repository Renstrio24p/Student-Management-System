// lrnController.js
import { Request, Response } from 'express';
import { Token } from '../../models/accessToken.model.ts';
import { verifyLRN } from './lrn.controller.ts';

// Verify Access Token function
export const verifyAccessToken = async (req: Request, _res?: Response): Promise<boolean | void> => {
    const { accessToken, role } = req.body;

    const tokenRecord = await Token.findOne({ token: accessToken });
    console.log('Token Record:', tokenRecord);
    if (!tokenRecord) {
        console.log('Token does not exist in the database');
        return false; // Token does not exist
    }

    if (role === "Student") {
        if (accessToken) {
            const isLrnValid = await verifyLRN(req);
            if (!isLrnValid) {
                console.log('Invalid LRN');
                return false;
            } else {
                return true
            }
        }
    }

    if (role === "Teacher" || role === "Admin") {
        return true;
    }

};

// Function to verify LRN separately if needed

