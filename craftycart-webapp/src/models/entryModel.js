import mongoose, { isObjectIdOrHexString } from 'mongoose';

const entrySchema = new mongoose.Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lists",
    },
    itemText: {
        type: String,
        required: [true, "Item text required"],
    },
    brandText: {
        type:String,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    linked: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "items"}]
    },
    creationDate: {
        type: Date,
        required: [true],
        default: Date.now,
    },
})

const ListEntry = mongoose.models.listEntries || mongoose.model("listEntries", entrySchema);

export default ListEntry;