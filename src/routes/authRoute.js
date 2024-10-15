import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/register", authController.signup_post);
router.post("/login", authController.login_post);
 
export default router;
