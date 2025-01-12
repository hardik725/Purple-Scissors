import express from "express";
import { verifyTempUser, createTempUser } from "../Controller/TempUserController.js"; 

const router = express.Router();

router.post("/create", createTempUser);
router.post("/verify", verifyTempUser);

export default router;
