import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String,
        maxlength: 200,
        default: "",
    },
    avatar: {
        type: String,
        enum: ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"],
        default: "avatar1",
    },
    githubUrl: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true }); // adds createdAt + updatedAt automatically

export const User = mongoose.model("User", UserSchema);