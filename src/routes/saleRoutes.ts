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
router.use(authenticateJWT);

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
