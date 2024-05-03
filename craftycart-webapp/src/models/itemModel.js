import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    storeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores",
    },
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
    priceType: {
        type: String, 
        default: 'UNIT' // 'WEIGHT' or 'VOLUME'
    }
})

const Item = mongoose.models.items || mongoose.model("items", itemSchema);

export default Item;