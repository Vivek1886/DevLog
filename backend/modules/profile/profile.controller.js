import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    getMyProfile,
    updateMyProfile,
    getPublicProfile,
    updateAvatar,
} from "./profile.service.js";

// ─── Get My Profile ──────────────────────────────────────────
export const getMyProfileHandler = asyncHandler(async (req, res) => {
    const profile = await getMyProfile(req.user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Profile fetched", profile));
});


// ─── Update My Profile ───────────────────────────────────────
export const updateMyProfileHandler = asyncHandler(async (req, res) => {
    const profile = await updateMyProfile(req.user._id, req.body);

    return res
        .status(200)
        .json(new ApiResponse(200, "Profile updated", profile));
});


// ─── Get Public Profile ──────────────────────────────────────
export const getPublicProfileHandler = asyncHandler(async (req, res) => {
    const data = await getPublicProfile(req.params.username);

    return res
        .status(200)
        .json(new ApiResponse(200, "Public profile fetched", data));
});


// ─── Update Avatar ───────────────────────────────────────────
export const updateAvatarHandler = asyncHandler(async (req, res) => {
    const { avatar } = req.body;

    const user = await updateAvatar(req.user._id, avatar);

    return res
        .status(200)
        .json(new ApiResponse(200, "Avatar updated", user));
});