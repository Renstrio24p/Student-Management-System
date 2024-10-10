import { getEnvVariable } from "../../helpers/getEnv.ts";
import { Token } from "../../models/accessToken.model.ts";
import { Request, Response } from "express";

const generateRandomId = (length: number): string => {
    const characters = '0123456789'; // Only using digits for the student ID
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

// Function to generate LRN
export const generateLRN = async (schoolID: string, tokenId: string): Promise<string> => {
    if (schoolID.length !== 6) {
        throw new Error('School ID must be exactly 6 characters long.');
    }

    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear.toString().slice(-2);
    const studentId = generateRandomId(4);

    // Construct the LRN
    const lrn = `${schoolID}${lastTwoDigits}${studentId}`;

    // Create a new token for the user
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // Example expiration time (1 hour)
    const newToken = new Token({
        token: lrn, // Use the generated LRN as the token
        tokenId: tokenId, // Associate the token with the user
        expiresAt: expirationTime,
    });

    // Save the new token to the database
    await newToken.save();

    return lrn; // Return the generated LRN
};

export const generateLRNController = async (req: Request, res: Response) => {
    const { tokenId } = req.body; // Expecting schoolID and userId in the request body

    const schoolID = getEnvVariable('SCHOOL_ID');

    if (!schoolID || !tokenId) {
        return res.status(400).json({
            success: false,
            message: 'School ID and User ID are required.',
        });
    }

    try {
        // Call the function to generate LRN
        const lrn = await generateLRN(schoolID, tokenId);

        // Return the generated LRN
        return res.status(201).json({
            success: true,
            lrn, // Send back the generated LRN
        });
    } catch (error) {
        console.error('Error generating LRN:', error);
        return res.status(500).json({
            success: false,
            message: (error as Error).message || 'Server error while generating LRN.',
        });
    }
}