import { Router } from "express";
import {
  createProductType,
  getProductType,
  getAllProductTypes,
  updateProductType,
  deleteProductType,
} from "../controllers/productTypeController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createProductType);
router.get("/", authenticateJWT, getAllProductTypes);
router.get("/:id", authenticateJWT, getProductType);
router.put("/:id", authenticateJWT, updateProductType);
router.delete("/:id", authenticateJWT, deleteProductType);

export default router;
