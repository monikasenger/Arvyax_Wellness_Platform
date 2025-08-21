import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);

export default authrouter;
