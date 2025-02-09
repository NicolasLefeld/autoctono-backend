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
router.use(authenticateJWT);

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
