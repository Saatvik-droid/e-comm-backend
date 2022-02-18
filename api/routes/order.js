import { Router } from "express";

import * as orderController from "../controllers/order.js";
import isValidObjectId from "../middleware/validateId.js";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", isValidObjectId, orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:id", isValidObjectId, orderController.updateOrderById);
router.delete("/:id", isValidObjectId, orderController.cancelOrderById);

export default router;
