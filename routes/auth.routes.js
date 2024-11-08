import express from "express"

import { signUp, signIn, logout } from "../controllers/auth.controller.js"
const router = express.Router()


// Sign In
router.post("/sign-in", signIn)

// Sign Up
router.post("/sign-up", signUp)

// Logout
router.post("/log-out", logout)



export default router