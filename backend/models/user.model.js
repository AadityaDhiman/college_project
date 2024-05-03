// username,email,mobile,password,confirm_password
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    
})

const UserModel = mongoose.model("user", UserSchema)


export default UserModel