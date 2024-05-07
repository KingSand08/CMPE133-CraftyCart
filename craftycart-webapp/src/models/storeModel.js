import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'item name is required'],
    },
    address: {
        // list longitude first then latitude
        type: String,
        required: false,
    },
    // add lat and long coords
    // look into GeoJSON type to make distance arithmetic easier later on
    // coordinates: {
    //     type: "Point",
    //     required: false
    // },
    locationName: {
        type: String,
        required: false
    }
})

const Store = mongoose.models.stores || mongoose.model("stores", storeSchema);

export default Store;