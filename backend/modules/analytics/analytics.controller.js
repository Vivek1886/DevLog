import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    getSummary,
    getStreak,
    getHeatmap,
    getTopTags,
    getMoodDistribution,
    getWeeklyHours,
} from "./analytics.service.js";

export const summaryHandler = asyncHandler(async (req, res) => {
    const data = await getSummary(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Summary fetched", data));
});

export const streakHandler = asyncHandler(async (req, res) => {
    const data = await getStreak(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Streak fetched", data));
});

export const heatmapHandler = asyncHandler(async (req, res) => {
    const data = await getHeatmap(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Heatmap fetched", data));
});

export const topTagsHandler = asyncHandler(async (req, res) => {
    const data = await getTopTags(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Top tags fetched", data));
});

export const moodDistributionHandler = asyncHandler(async (req, res) => {
    const data = await getMoodDistribution(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Mood distribution fetched", data));
});

export const weeklyHoursHandler = asyncHandler(async (req, res) => {
    const data = await getWeeklyHours(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, "Weekly hours fetched", data));
});