import { Router } from "express";
import {
    createStock,
    getStock,
    getAllStocks,
    updateStock,
    deleteStock,
} from "../controllers/stockController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.post("/", createStock);
router.get("/", getAllStocks);
router.get("/:id", getStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
