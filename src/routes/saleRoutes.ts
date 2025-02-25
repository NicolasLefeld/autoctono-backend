import { Router } from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesDTO,
  getSale,
  getSaleDTO,
  updateSale,
} from "../controllers/saleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", getAllSales);
router.get("/dto", getAllSalesDTO);
router.get("/:id", getSale);
router.get("/dto/:id", getSaleDTO); // TODO: Cambiar esto a get all y no get dto
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
