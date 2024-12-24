import { Router } from "express";
import {
  createStock,
  getStock,
  getAllStocks,
  updateStock,
  deleteStock,
} from "../controllers/stockController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createStock);
router.get("/", authenticateJWT, getAllStocks);
router.get("/:id", authenticateJWT, getStock);
router.put("/:id", authenticateJWT, updateStock);
router.delete("/:id", authenticateJWT, deleteStock);

export default router;
