import { Router } from "express";
import {
  getProductsSale,
  getAllProductsSale,
} from "../controllers/productSaleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", getAllProductsSale);
router.get("/:id", getProductsSale);
// router.post("/", createProductSale);
// router.put("/:id", updateProductSale);
// router.delete("/:id", deleteProductSale);

export default router;
