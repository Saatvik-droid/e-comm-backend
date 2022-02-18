import { Router } from "express";
import {
  validateObjectId,
  validateEmailAndPassword,
  validateUsername,
} from "../middleware/validator.js";
import auth from "../middleware/auth.js";

import * as userController from "../controllers/user.js";

const router = Router();

router.get("/:id", validateObjectId, userController.getUserById);
router.get("/username/:username", userController.getUserByUsername);
router.post(
  "/signup",
  validateEmailAndPassword,
  validateUsername,
  userController.userSignUp
);
router.post("/signin", validateEmailAndPassword, userController.userSignIn);
router.delete("/:id", validateObjectId, auth, userController.userDelete);

export default router;
