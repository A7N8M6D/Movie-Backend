import { Router } from "express";
import { createUser, getProfile, loginUser,Logout,updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();
router.route("/signUp").post(createUser);
router.route("/signIN").post(loginUser);
router.route("/get").get(verifyJWT, getProfile);
router.route("/logout").post(verifyJWT, Logout);
router.route("/update").put(verifyJWT, updateProfile);

updateProfile


export default router
