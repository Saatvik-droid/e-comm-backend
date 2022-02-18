import { Router } from "express";

import * as productController from "../controllers/product.js";
import auth from "../middleware/auth.js";
import { validateObjectId } from "../middleware/validator.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", validateObjectId, productController.getProductById);
router.post("/", auth, productController.createProduct);
router.patch(
  "/:id",
  validateObjectId,
  auth,
  productController.updateProductById
);
router.delete(
  "/:id",
  validateObjectId,
  auth,
  productController.hideProductById
);

export default router;
