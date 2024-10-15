import mongoose from "mongoose";

// create a new schema for user
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    role:{
        type: String,
        enum: ["admin", "user"], // set the value for role either 'user' or 'admin'
        default: "user", // default value is 'user'
    }
})

const User = mongoose.model('userdata',userSchema)

export default User