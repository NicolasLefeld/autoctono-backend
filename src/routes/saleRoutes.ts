import { Router } from "express";
import {
  createSale,
  getSale,
  getAllSales,
  updateSale,
  deleteSale,
} from "../controllers/saleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createSale);
router.get("/", authenticateJWT, getAllSales);
router.get("/:id", authenticateJWT, getSale);
router.put("/:id", authenticateJWT, updateSale);
router.delete("/:id", authenticateJWT, deleteSale);

export default router;
