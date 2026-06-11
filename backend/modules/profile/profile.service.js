import { User } from "../user/user.model.js";
import { Log } from "../log/log.model.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";
// ─── Get My Profile ──────────────────────────────────────────
export const getMyProfile = async (userId) => {

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};


// ─── Update My Profile ───────────────────────────────────────
export const updateMyProfile = async (userId, updateData) => {

    // These fields are NOT allowed to be updated here
    const { password, email, refreshToken, ...safeData } = updateData;

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: safeData },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};
const toObjectId = (id) => new mongoose.Types.ObjectId(id);

// ─── Get Public Profile ──────────────────────────────────────
export const getPublicProfile = async (username) => {

    // 1. Find user by username
    const user = await User.findOne({ username: username.toLowerCase() })
        .select("-password -refreshToken -email");

    if (!user) throw new ApiError(404, "User not found");

    const stats = await Log.aggregate([
        { $match: { userId: toObjectId(user._id) } },   // ← fix
        {
            $group: {
                _id: null,
                totalLogs: { $sum: 1 },
                totalHours: { $sum: "$hoursSpent" },
            },
        },
    ])

    // 3. Get their last 5 logs
    const recentLogs = await Log.find({ userId: user._id })
        .sort({ date: -1 })
        .limit(5)
        .select("title tags mood hoursSpent date");

    // 4. Get heatmap data (last 1 year)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const heatmap = await Log.aggregate([
        {
            $match: {
                userId: user._id,
                date: { $gte: oneYearAgo },
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return {
        user,
        stats: stats[0] || { totalLogs: 0, totalHours: 0 },
        recentLogs,
        heatmap: heatmap.map((h) => ({ date: h._id, count: h.count })),
    };
};


// ─── Update Avatar ───────────────────────────────────────────
export const updateAvatar = async (userId, avatar) => {

    const validAvatars = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"];

    if (!validAvatars.includes(avatar)) {
        throw new ApiError(400, "Invalid avatar option");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { avatar } },
        { new: true }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};