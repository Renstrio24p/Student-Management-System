// src/models/token.model.ts
import { Schema, model } from 'mongoose';

// Define the Token interface

// Create the Token schema
const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    tokenId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: false,
    },
});

// Create the Token model
export const Token = model('Token', tokenSchema);

