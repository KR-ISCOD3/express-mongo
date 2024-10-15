import express from "express";
import userController from "../controller/userController.js";

const userrouter = express.Router();

userrouter.get('/get',userController.get_data)

export default userrouter