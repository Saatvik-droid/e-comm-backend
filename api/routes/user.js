import { Router } from "express";

import * as userController from "../controllers/user.js";

const router = Router();

router.post("/signup", userController.userSignUp);
router.post("/signin", userController.userSignIn);
router.delete("/:id", userController.userDelete);

export default router;
