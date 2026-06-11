import { Router } from "express";
import {
    createLogHandler,
    getAllLogsHandler,
    getLogByIdHandler,
    updateLogHandler,
    deleteLogHandler,
} from "./log.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createLogSchema, updateLogSchema } from "./log.validator.js";

const router = Router();

// All log routes are protected
router.use(verifyJWT);

router.post("/", validate(createLogSchema), createLogHandler);
router.get("/", getAllLogsHandler);
router.get("/:id", getLogByIdHandler);
router.patch("/:id", validate(updateLogSchema), updateLogHandler);
router.delete("/:id", deleteLogHandler);

export default router;