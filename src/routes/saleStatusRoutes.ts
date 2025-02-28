import { Router } from "express";
import {
    createSaleStatus,
    deleteSaleStatus,
    getAllSaleStatus,
    getSaleStatus,
    updateSaleStatus,
} from "../controllers/saleStatusController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", getAllSaleStatus);
router.get("/:id", getSaleStatus);
router.post("/", createSaleStatus);
router.put("/:id", updateSaleStatus);
router.delete("/:id", deleteSaleStatus);

export default router;
