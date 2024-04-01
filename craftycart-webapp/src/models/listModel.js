import mongoose, { isObjectIdOrHexString } from 'mongoose';

const listSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    creationDate: {
        type: Date,
        required: [true],
        default: Date.now,
    },
    saved: {
        type: Boolean,
        default: false,
    },
})

const ShoppingList = mongoose.models.lists || mongoose.model("lists", listSchema);

export default ShoppingList;