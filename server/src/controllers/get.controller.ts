import { Request, Response } from "express";
import { Product } from "../models/products.model.ts";
import { Error, Expression } from "mongoose";

const byQuery = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const query = req.query;

        const products = await Product.find(query);

        return products.length > 0
            ? res.status(200).json(products)
            : res.status(404).json({ message: 'No products found' });

    } catch (error) {
        return res.status(500).json({ message: 'Failed to get products: ' + (error as Error).message });
    }
}

const byId = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const { id } = req.params

        const products = await Product.findById(id);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get products' + (error as Error).message });
    }
}

export const getrouter = { byId, byQuery }