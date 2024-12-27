import { Router } from "express";
import {
  createCustomer,
  getCustomer,
  getAllCustomers, 
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createCustomer);
router.get("/", authenticateJWT, getAllCustomers);
router.get("/:id", authenticateJWT, getCustomer);
router.put("/:id", authenticateJWT, updateCustomer);
router.delete("/:id", authenticateJWT, deleteCustomer);

export default router;
