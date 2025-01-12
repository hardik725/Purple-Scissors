import express from "express";
import { postReview } from "../Controller/ReviewController.js";

const router = express.Router();

router.post("/post", postReview);

export default router;
