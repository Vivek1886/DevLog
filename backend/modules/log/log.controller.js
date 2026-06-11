import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    createLog,
    getAllLogs,
    getLogById,
    updateLog,
    deleteLog,
} from "./log.service.js";

// ─── Create ──────────────────────────────────────────────────
export const createLogHandler = asyncHandler(async (req, res) => {
    console.log("req.user:", req.user._id); // ← add this
    console.log("req.body:", req.body);
    const log = await createLog(req.user._id, req.body);

    return res
        .status(201)
        .json(new ApiResponse(201, "Log created successfully", log));
});


// ─── Get All ─────────────────────────────────────────────────
export const getAllLogsHandler = asyncHandler(async (req, res) => {

    // All filters come from query params
    // GET /api/logs?mood=focused&tag=nodejs&page=1&limit=10
    const filters = {
        mood: req.query.mood,
        tag: req.query.tag,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        page: req.query.page,
        limit: req.query.limit,
    };

    const result = await getAllLogs(req.user._id, filters);

    return res
        .status(200)
        .json(new ApiResponse(200, "Logs fetched successfully", result));
});


// ─── Get One ─────────────────────────────────────────────────
export const getLogByIdHandler = asyncHandler(async (req, res) => {
    const log = await getLogById(req.params.id, req.user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Log fetched successfully", log));
});


// ─── Update ──────────────────────────────────────────────────
export const updateLogHandler = asyncHandler(async (req, res) => {
    const log = await updateLog(req.params.id, req.user._id, req.body);

    return res
        .status(200)
        .json(new ApiResponse(200, "Log updated successfully", log));
});


// ─── Delete ──────────────────────────────────────────────────
export const deleteLogHandler = asyncHandler(async (req, res) => {
    await deleteLog(req.params.id, req.user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Log deleted successfully", null));
});