import mongoose  from "mongoose";

const productsCollection = 'products';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export const products = mongoose.model(productsCollection, ProductSchema);