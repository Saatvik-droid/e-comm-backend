import { Router } from "express";

import * as productController from "../controllers/product.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", auth, productController.createProduct);
router.patch("/:id", auth, productController.updateProductById);
router.delete("/:id", auth, productController.hideProductById);

export default router;
