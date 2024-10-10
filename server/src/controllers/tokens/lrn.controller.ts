import { Request, Response } from 'express';
import { Token } from '../../models/accessToken.model.ts';

export const verifyLRN = async (req: Request, res?: Response): Promise<boolean | void> => {
    const { lrn } = req.body;

    if (!lrn) {
        res?.status(400).json({
            success: false,
            message: 'LRN is required.',
        });
        return;
    }

    try {
        const tokenRecord = await Token.findOne({ token: lrn });
        console.log('Token Record:', tokenRecord);
        if (tokenRecord) {
            res?.status(200).json({
                success: true,
                message: 'LRN verified successfully.',
                user: tokenRecord,
            });
            return true;
        } else {
            res?.status(404).json({
                success: false,
                message: 'LRN not found.',
            });
            return false;
        }
    } catch (error) {
        console.error('Error verifying LRN:', error);
        res?.status(500).json({
            success: false,
            message: 'Server error while verifying LRN.',
        });
    }
};
