import mongoose  from "mongoose";

const cartsCollection = 'carts';

const CartSchema = new mongoose.Schema({
    
    timestamp: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
        
    },
    
    
});

export const cart = mongoose.model(cartsCollection, CartSchema);