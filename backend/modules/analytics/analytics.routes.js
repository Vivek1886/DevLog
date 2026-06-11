import { Router } from "express";
import {
    summaryHandler,
    streakHandler,
    heatmapHandler,
    topTagsHandler,
    moodDistributionHandler,
    weeklyHoursHandler,
} from "./analytics.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // all analytics routes are protected

router.get("/summary", summaryHandler);
router.get("/streak", streakHandler);
router.get("/heatmap", heatmapHandler);
router.get("/tags", topTagsHandler);
router.get("/mood", moodDistributionHandler);
router.get("/weekly-hours", weeklyHoursHandler);

export default router;