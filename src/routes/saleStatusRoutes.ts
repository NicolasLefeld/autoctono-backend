import { Router } from "express";
import {
    createSaleStatus,
    getSaleStatus,
    getAllSaleStatuses,
    updateSaleStatus,
    deleteSaleStatus,
} from "../controllers/saleStatusController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createSaleStatus);
router.get("/", getAllSaleStatuses);
router.get("/:id", getSaleStatus);
router.put("/:id", updateSaleStatus);
router.delete("/:id", deleteSaleStatus);

export default router;
