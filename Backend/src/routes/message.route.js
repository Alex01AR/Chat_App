import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/send/:id").post(verifyJWT,sendMessage);
router.route("/:id").get(verifyJWT, getMessage);

export default router;