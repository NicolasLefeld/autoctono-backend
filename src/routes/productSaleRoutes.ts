import { Router } from "express";
import {
    createProductSale,
    getProductSale,
    getAllProductSale,
    updateProductSale,
    deleteProductSale,
} from "../controllers/productSaleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createProductSale);
router.get("/", getAllProductSale);
router.get("/:id", getProductSale);
router.put("/:id", updateProductSale);
router.delete("/:id", deleteProductSale);

export default router;
