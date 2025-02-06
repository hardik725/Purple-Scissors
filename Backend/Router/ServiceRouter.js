import express from "express";
import { addService,getServicesByCategory } from "../Controller/ServiceController.js";

const router = express.Router();

router.post("/add", addService);

router.get("/get",getServicesByCategory);

export default router;