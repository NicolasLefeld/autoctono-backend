import { Router } from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";

const router = Router();

router.post("/", createCustomer);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
