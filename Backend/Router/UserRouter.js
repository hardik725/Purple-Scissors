import express from "express";
import { signUp, login,username } from "../Controller/UserController.js";

const router = express.Router();

// Sign Up Route
router.post("/signup", signUp);

// Login Route
router.post("/login", login);

// Get username
router.post("/getname", username);

export default router;
