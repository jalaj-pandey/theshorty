import mongoose from "mongoose";
import { customAlphabet } from "nanoid";


const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 8);

const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type: "string",
        required: true
    },
    shortUrl:{
        type: "string",
        required: true,
        default: ()=> nanoid(),
        unique: true,
    },
    clicks:{
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
},
{
    timestamps: true,
});

export const urlModel = mongoose.model("shortUrl", shortUrlSchema)
