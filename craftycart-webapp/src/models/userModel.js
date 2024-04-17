import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "password required"],
    },
    isVerified: {
       type: Boolean,
       default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    activeList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lists",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;