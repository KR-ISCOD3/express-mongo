import mongoose from "mongoose";
import { config } from "dotenv";
// config .env file
config();

// declare url for mongoose
const URL = process.env.MONGOURL;

// declare mongoose connection
const connectdb = async () =>{
    try{
        mongoose.connect(URL)
        .then(()=>{console.log("Connected")})
        .catch(()=>{console.log("Failed to connect")});
    }catch(e){
        console.log("Connection is not established");
    }
}

// export mongoose
export default connectdb;