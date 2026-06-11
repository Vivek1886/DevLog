import { User } from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async ({ username, email, password, avatar }) => {

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existingUser) {
        throw new ApiError("User already exists", 400)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        avatar,
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    return createdUser;

}
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        throw new ApiError("User not found", 404)
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError("Invalid password", 401)
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    console.log(accessToken);

    await user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    return { user: loggedInUser, accessToken, refreshToken };
}


export const logoutUser = async (userId) => {
    const user = await User.findById(userId,
        { $set: { refreshToken: null } },
        { new: true }
    )

}

export const refreshAccessToken = async (incomingRefreshToken) => {

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    // 1. Verify the refresh token
    let decoded;
    try {
        decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    // 2. Find user
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token mismatch");
    }

    // 3. Generate new access token
    const newAccessToken = generateAccessToken(user._id);

    return { accessToken: newAccessToken };
};