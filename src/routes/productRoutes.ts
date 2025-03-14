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
router.use(authenticateJWT);

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/update-prices", updateProductPrices);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
