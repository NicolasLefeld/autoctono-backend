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
router.use(authenticateJWT);

router.post("/", createProductType);
router.get("/", getAllProductTypes);
router.get("/:id", getProductType);
router.put("/:id", updateProductType);
router.delete("/:id", deleteProductType);

export default router;
