import express from "express";
import { postReview, getAllReviews } from "../Controller/ReviewController.js";

const router = express.Router();

router.post("/post", postReview);

router.get("/allreviews",getAllReviews);

export default router;
