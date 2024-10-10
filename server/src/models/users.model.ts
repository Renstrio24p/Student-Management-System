import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "User password is required"],
    },
    role: {
        type: String,
        required: [true, "User role is required"],
        default: "user",
    },
    image: {
        type: String,
        required: false,
    },
    accessToken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true

})

export const User = mongoose.model("User", userSchema);