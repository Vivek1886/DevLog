import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    userId: {                              // ← THIS was missing
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        default: "",
        maxlength: 1000,
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: (tags) => tags.length <= 5,
            message: "Maximum 5 tags allowed",
        },
    },
    hoursSpent: {
        type: Number,
        required: true,
        min: 0.5,
        max: 16,
    },
    mood: {
        type: String,
        enum: ["focused", "motivated", "tired", "blocked", "okay"],
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },

}, { timestamps: true })

logSchema.index({ userId: 1, date: -1 });
export const Log = mongoose.model("Log", logSchema);