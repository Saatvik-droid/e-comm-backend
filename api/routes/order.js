import { Router } from "express";

import * as orderController from "../controllers/order.js";
import { validateObjectId } from "../middleware/validator.js";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", validateObjectId, orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:id", validateObjectId, orderController.updateOrderById);
router.delete("/:id", validateObjectId, orderController.cancelOrderById);

export default router;
