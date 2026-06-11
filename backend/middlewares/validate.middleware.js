import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        // Zod errors live in result.error.issues — not result.error.errors
        const errorMessages = result.error.issues
            .map((e) => e.message)
            .join(", ");
        return next(new ApiError(400, errorMessages));
    }

    req.body = result.data;
    next();
};