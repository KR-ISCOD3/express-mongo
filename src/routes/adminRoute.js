import express from "express";
import adminController from "../controller/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const adminrouter = express.Router();

adminrouter.get('/get',adminController.get_data);
adminrouter.post('/post',requireAdmin,adminController.post_data);
adminrouter.put('/put/:id',requireAdmin,adminController.put_data);
adminrouter.delete('/delete/:id',requireAdmin,adminController.del_data);

export default adminrouter;