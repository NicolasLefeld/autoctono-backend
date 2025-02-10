import { Router } from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProductPrices,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createProduct);
router.get("/", authenticateJWT, getAllProducts);
router.get("/:id", authenticateJWT, getProduct);
router.put("/update-prices", authenticateJWT, updateProductPrices);
router.put("/:id", authenticateJWT, updateProduct);
router.delete("/:id", authenticateJWT, deleteProduct);

export default router;
