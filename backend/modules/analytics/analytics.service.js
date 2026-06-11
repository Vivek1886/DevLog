import { Log } from "../log/log.model.js";
import mongoose from "mongoose";

// helper — convert once at top of every function
const toObjectId = (id) => new mongoose.Types.ObjectId(id);

// ─── Summary ─────────────────────────────────────────────────
export const getSummary = async (userId) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const result = await Log.aggregate([
        {
            $match: {
                userId: toObjectId(userId),   // ← fix
                date: { $gte: startOfMonth },
            },
        },
        {
            $group: {
                _id: null,
                totalHoursMonth: {
                    $sum: { $cond: [{ $gte: ["$date", startOfMonth] }, "$hoursSpent", 0] },
                },
                totalHoursWeek: {
                    $sum: { $cond: [{ $gte: ["$date", startOfWeek] }, "$hoursSpent", 0] },
                },
                totalLogsMonth: { $sum: 1 },
            },
        },
    ]);

    return result[0] || { totalHoursMonth: 0, totalHoursWeek: 0, totalLogsMonth: 0 };
};


// ─── Streak ───────────────────────────────────────────────────
export const getStreak = async (userId) => {
    const logs = await Log.aggregate([
        { $match: { userId: toObjectId(userId) } },   // ← fix
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            },
        },
        { $sort: { _id: -1 } },
    ]);

    if (!logs.length) return { currentStreak: 0, longestStreak: 0 };

    const dates = logs.map((l) => l._id);
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    let currentStreak = 0;
    if (dates[0] !== today && dates[0] !== yesterday) {
        currentStreak = 0;
    } else {
        let expected = dates[0] === today ? today : yesterday;
        for (const date of dates) {
            if (date === expected) {
                currentStreak++;
                const d = new Date(expected);
                d.setDate(d.getDate() - 1);
                expected = d.toISOString().split("T")[0];
            } else break;
        }
    }

    let longestStreak = 1;
    let tempStreak = 1;
    for (let i = 1; i < dates.length; i++) {
        const prev = new Date(dates[i - 1]);
        const curr = new Date(dates[i]);
        const diffDays = (prev - curr) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 1;
        }
    }

    return { currentStreak, longestStreak };
};


// ─── Heatmap ──────────────────────────────────────────────────
export const getHeatmap = async (userId) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const result = await Log.aggregate([
        {
            $match: {
                userId: toObjectId(userId),   // ← fix
                date: { $gte: oneYearAgo },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                totalHours: { $sum: "$hoursSpent" },
                count: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return result.map((r) => ({ date: r._id, totalHours: r.totalHours, count: r.count }));
};


// ─── Top Tags ─────────────────────────────────────────────────
export const getTopTags = async (userId) => {
    const result = await Log.aggregate([
        { $match: { userId: toObjectId(userId) } },   // ← fix
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
    ]);

    return result.map((r) => ({ tag: r._id, count: r.count }));
};


// ─── Mood Distribution ────────────────────────────────────────
export const getMoodDistribution = async (userId) => {
    const result = await Log.aggregate([
        { $match: { userId: toObjectId(userId) } },   // ← fix
        { $group: { _id: "$mood", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]);

    return result.map((r) => ({ mood: r._id, count: r.count }));
};


// ─── Weekly Hours ─────────────────────────────────────────────
export const getWeeklyHours = async (userId) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    const result = await Log.aggregate([
        {
            $match: {
                userId: toObjectId(userId),   // ← fix
                date: { $gte: startOfWeek },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                totalHours: { $sum: "$hoursSpent" },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return result.map((r) => ({ date: r._id, totalHours: r.totalHours }));
};