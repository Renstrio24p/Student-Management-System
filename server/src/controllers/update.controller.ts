import { Request, Response } from "express";
import { Expression } from "mongoose";
import { Product } from "../models/products.model.ts";


export const updaterouter = async (req: Request, res: Response): Promise<Expression> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        return !product
            ? res.status(404).json({ message: `Product [${id}] not found` })
            : res.status(200).json({ message: `Product [${id}] updated`, data: product });

    } catch (error) {
        return res.status(500).json({ message: `Failed to update product [${req.params.id}]: ` + (error as Error).message });
    }
}

