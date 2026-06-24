import express from "express";
import {
  stats,
  lowStock,
  recentTransactions,
  inventoryValue,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", stats);

router.get("/low-stock", lowStock);

router.get("/recent-transactions", recentTransactions);

router.get("/inventory-value", inventoryValue);

export default router;