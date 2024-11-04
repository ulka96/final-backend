
import express from "express"

const router = express.Router()

import {getUsers, getUser, deleteUser, updateUser, addUser} from "../controllers/user.controller.js"

// Get Users

router.get("/", getUsers)

// Get Single User

router.get("/:id", getUser)

// Delete User

router.delete("/:id", deleteUser)

// Update User

router.patch("/:id", updateUser)

// Add User

router.post("/", addUser )



export default router
