import express from "express";
import {
  addStock,
  removeStock,
  history,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.post("/in", addStock);

router.post("/out", removeStock);

router.get("/history", history);

export default router;