import express from "express";
import {  loginUser, registerUser,logoutUser, getOtherUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post( verifyJWT, logoutUser);
router.route("/").get(verifyJWT ,getOtherUsers);

export default router;