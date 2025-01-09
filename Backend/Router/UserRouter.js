import express from "express";
import { signUp, login } from "../Controller/UserController.js";

const router = express.Router();

// Sign Up Route
router.post("/signup", signUp);

// Login Route
router.post("/login", login);

export default router;
