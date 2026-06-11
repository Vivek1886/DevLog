import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Access token missing");  // ← number not string
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired access token");  // ← number
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "User not found");  // ← number
    }

    req.user = user;
    next();
});