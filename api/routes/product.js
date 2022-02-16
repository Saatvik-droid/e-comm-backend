import { Router } from "express";

import * as productController from "../controllers/product.js";
import auth from "../middleware/auth.js";
import isValidObjectId from "../middleware/validateId.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", isValidObjectId, productController.getProductById);
router.post("/", auth, productController.createProduct);
router.patch(
  "/:id",
  isValidObjectId,
  auth,
  productController.updateProductById
);
router.delete("/:id", isValidObjectId, auth, productController.hideProductById);

export default router;
