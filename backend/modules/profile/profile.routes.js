import { Router } from "express";
import {
    getMyProfileHandler,
    updateMyProfileHandler,
    getPublicProfileHandler,
    updateAvatarHandler,
} from "./profile.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// ── Public route (no login needed) ──
router.get("/u/:username", getPublicProfileHandler);

// ── Protected routes ──
router.use(verifyJWT);

router.get("/me", getMyProfileHandler);
router.patch("/me", updateMyProfileHandler);
router.patch("/me/avatar", updateAvatarHandler);

export default router;