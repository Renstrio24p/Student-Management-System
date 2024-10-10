import { Request, Response } from 'express';
import { Token } from '../../models/accessToken.model.ts';

const generateAccessToken = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
};

export const generateToken = async (req: Request, res: Response) => {
    const tokenLength = 16; // Define the length of the token
    const accessToken = generateAccessToken(tokenLength); // Generate the token

    try {
        // Check if a token already exists for the provided tokenId
        const existingToken = await Token.findOne({ tokenId: req.body.tokenId });

        if (existingToken) {
            // If a token already exists, return an appropriate response
            return res.status(400).json({
                success: false,
                message: 'Token already exists for this tokenId.',
                existingToken: existingToken.token, // Optional: return the existing token
            });
        }

        // Create a new token document without expiration
        const newToken = new Token({
            token: accessToken,
            tokenId: req.body.tokenId,
            // Remove expiresAt to make it permanent
        });

        // Save the token to the database
        await newToken.save();

        // Return the generated token
        return res.status(201).json({
            success: true,
            accessToken
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error generating token',
            error: (error as Error).message
        });
    }
};
