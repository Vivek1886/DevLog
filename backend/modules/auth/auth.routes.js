import { Router } from "express";
import {
    register,
    login,
    logout,
    refreshToken,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validator.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);

// Protected route (need to be logged in to logout)
router.post("/logout", verifyJWT, logout);

export default router;