import { z } from "zod";

export const createLogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters"),
    description: z
        .string()
        .max(1000, "Description must be at most 1000 characters")
        .optional()
        .default(""),
    tags: z
        .array(z.string().trim().toLowerCase())
        .max(5, "Maximum 5 tags allowed")
        .optional()
        .default([]),
    hoursSpent: z
        .number()
        .min(0.5, "Minimum 0.5 hours")
        .max(16, "Maximum 16 hours"),
    mood: z.enum(["focused", "motivated", "tired", "blocked", "okay"]),
    date: z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : new Date())),
});

export const updateLogSchema = z.object({
    title: z
        .string()
        .min(3)
        .max(100)
        .optional(),
    description: z
        .string()
        .max(1000)
        .optional(),
    tags: z
        .array(z.string().trim().toLowerCase())
        .max(5)
        .optional(),
    hoursSpent: z
        .number()
        .min(0.5)
        .max(16)
        .optional(),
    mood: z
        .enum(["focused", "motivated", "tired", "blocked", "okay"])
        .optional(),
    date: z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
});