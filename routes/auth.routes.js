import express from "express"

import { signUp, signIn, logout } from "../controllers/auth.controller.js"
import profilePictureUpload from "../multer/profileConfig.js"

const router = express.Router()


// Sign In
router.post("/sign-in", signIn)

// Sign Up
router.post("/sign-up",profilePictureUpload.single("profilePic"), signUp)

// Logout
router.post("/log-out", logout)


export default router