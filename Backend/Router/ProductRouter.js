import express from "express";
import { getProductsByCategory,getProductsByCompany,getProductsBySubCategory } from "../Controller/ProductController.js";


const router = express.Router();

router.post("/category",getProductsByCategory);

router.post("/company",getProductsByCompany);

router.post("/subcategory",getProductsBySubCategory);

export default router;