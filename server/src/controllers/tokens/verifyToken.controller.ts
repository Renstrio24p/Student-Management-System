import { Request, Response } from 'express';
import { Token } from '../../models/accessToken.model.ts';

export const verifySessionToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);

    // Check if the token is provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is required.',
        });
    }

    try {
        // Check if the token exists in the database
        const tokenRecord = await Token.findOne({ token: token });
        if (!tokenRecord) {
            return res.status(404).json({
                success: false,
                message: 'Token not found.',
            });
        }

        // If the token is valid, return the user details
        return res.status(200).json({
            success: true,
            message: 'Token verified successfully.',
            user: {
                id: tokenRecord.tokenId, // Adjust based on your Token schema
                // Include other user details if needed
            },
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};
