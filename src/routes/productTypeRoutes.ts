import { Router } from "express";
import {
  createProductType,
  getProductType,
  getAllProductTypes,
  updateProductType,
  updateProductTypePrices,
  deleteProductType,
} from "../controllers/productTypeController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createProductType);
router.get("/", getAllProductTypes);
router.get("/:id", getProductType);
router.put("/:id", updateProductType);
router.put("/update-prices", updateProductTypePrices);
router.delete("/:id", deleteProductType);

export default router;
