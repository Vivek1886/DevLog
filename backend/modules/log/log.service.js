import { Log } from "./log.model.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";
// ─── Create Log ──────────────────────────────────────────────
export const createLog = async (userId, logData) => {
    console.log("userId from service:", userId);
    console.log("logData from service:", logData);
    const log = await Log.create({
        userId,
        ...logData,
    });

    return log;
};


// ─── Get All Logs (with filters) ─────────────────────────────
export const getAllLogs = async (userId, filters = {}) => {
    const query = {
        userId: new mongoose.Types.ObjectId(userId)  // ← fix here
    };

    if (filters.mood) query.mood = filters.mood;
    if (filters.tag) {
        query.tags = filters.tag.toLowerCase(); // direct match inside array
    }

    if (filters.startDate || filters.endDate) {
        query.date = {};
        if (filters.startDate) query.date.$gte = new Date(filters.startDate);
        if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
        Log.find(query).sort({ date: -1 }).skip(skip).limit(limit),
        Log.countDocuments(query),
    ]);

    return {
        logs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

// ─── Get Single Log ──────────────────────────────────────────
export const getLogById = async (logId, userId) => {

    const log = await Log.findById(logId);

    if (!log) {
        throw new ApiError(404, "Log not found");
    }

    // Make sure user owns this log
    if (log.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not allowed to access this log");
    }

    return log;
};


// ─── Update Log ──────────────────────────────────────────────
export const updateLog = async (logId, userId, updateData) => {

    const log = await Log.findById(logId);

    if (!log) {
        throw new ApiError(404, "Log not found");
    }

    if (log.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not allowed to update this log");
    }

    // Only update fields that were actually sent
    Object.assign(log, updateData);
    await log.save();

    return log;
};


// ─── Delete Log ──────────────────────────────────────────────
export const deleteLog = async (logId, userId) => {

    const log = await Log.findById(logId);

    if (!log) {
        throw new ApiError(404, "Log not found");
    }

    if (log.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not allowed to delete this log");
    }

    await log.deleteOne();

    return { message: "Log deleted successfully" };
};