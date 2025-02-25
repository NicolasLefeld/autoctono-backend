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

router.get("/", getAllStocks);
router.get("/:id", getStock);
router.post("/", createStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
