import { Request, Response } from 'express';
import { Product } from '../models/products.model.ts';
import { Error, Expression } from 'mongoose';


export const addrouter = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const product = await Product.create(req.body);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create product' + (error as Error).message });
    }
}

