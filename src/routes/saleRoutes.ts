import { Router } from "express";
import {
    createSale,
    getSale,
    getAllSales,
    updateSale,
    deleteSale,
    getSaleDTO,
    getAllSalesDTO,
} from "../controllers/saleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/dto", getAllSalesDTO);
router.get("/:id", getSale);
router.get("/dto/:id", getSaleDTO);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
