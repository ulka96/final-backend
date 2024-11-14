import express from "express";

// Conrtollers
import { getNewArrivalsAll,getSingleNewArrival } from "../controllers/newArrivals.controller.js";

const router = express.Router();

router.get("/", getNewArrivalsAll);

router.get("/:productId", getSingleNewArrival)

export default router;