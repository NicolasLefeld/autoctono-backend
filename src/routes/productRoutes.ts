import { Router } from "express";
import {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
