import { Router } from "express";

import * as orderController from "../controllers/order.js";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:id", orderController.updateOrderById);
router.delete("/:id", orderController.cancelOrderById);

export default router;
