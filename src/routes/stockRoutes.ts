import { Router } from "express";
import {
  getAllStock,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from "../controllers/stockController";

const router = Router();

router.get("/", getAllStock);
router.get("/:id", getStockById);
router.post("/", createStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
