import asyncHandler from "../../utils/asyncHandler.js"
import ApiResponse from "../../utils/ApiResponse.js";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
} from "./auth.service.js";


export const register = asyncHandler(async (req, res) => {
    const { username, email, password, avatar } = req.body
    const user = await registerUser({ username, email, password, avatar })

    return res.status(201)
        .json(new ApiResponse(201, "user created successfully", user))
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginUser({ email, password });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, "user logged in successfully", {
            user,
            accessToken  // ← make sure this is here
        }));
});

export const logout = asyncHandler(async (req, res) => {

    // req.user comes from auth middleware (we build this next)
    await logoutUser(req.user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    return res
        .status(200)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "Logged out successfully", null));
});

export const refreshToken = asyncHandler(async (req, res) => {

    // Get refresh token from cookie or body (cookie is preferred)
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    const { accessToken } = await refreshAccessToken(incomingRefreshToken);

    return res
        .status(200)
        .json(new ApiResponse(200, "Access token refreshed", { accessToken }));
});