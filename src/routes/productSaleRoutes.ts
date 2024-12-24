import { Router } from "express";
import {
  createProductSale,
  getProductSale,
  getAllProductSales,
  updateProductSale,
  deleteProductSale,
} from "../controllers/productSaleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createProductSale);
router.get("/", authenticateJWT, getAllProductSales);
router.get("/:id", authenticateJWT, getProductSale);
router.put("/:id", authenticateJWT, updateProductSale);
router.delete("/:id", authenticateJWT, deleteProductSale);

export default router;
