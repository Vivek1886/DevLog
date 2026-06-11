import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    avatar: z
        .enum(["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"])
        .optional()
        .default("avatar1"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required"),
});