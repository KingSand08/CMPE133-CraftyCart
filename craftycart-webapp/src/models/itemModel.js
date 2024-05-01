import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'item name is required'],
    },
    brand: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    storeID: {
        type: String,
        required: true
    }
})

const Item = mongoose.models.items || mongoose.model("items", itemSchema);

export default Item;