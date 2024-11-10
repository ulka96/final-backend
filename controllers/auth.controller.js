import bcrypt from "bcryptjs"

// User model
import User from "../models/user.model.js"

// Utils
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"


// Sign In
export const signIn = async (request, response) => { 
    const { userName, password } = request.body

    if (!userName || !password) {
    return response.status(400).send({message: "Username and password are required"})
    }   
    try {
        const user = await User.findOne({ userName })
        if (!user) {
            return response.status(401).send({message: "Wrong password or username"})
        }
        
        // let's compare password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(401).send({message: "Wrong password or username"})
        }

    generateTokenAndSetCookie(user._id, response)
        
        response.status(200).send({ user, message: "Sign in successfully" })

    }    
    catch (error) {
        console.error(error)
        response.status(500).send({message: "Server Error"})
    }
}

// Sign Up
export const signUp = async (request, response) => { 

    console.log(request.body)
    console.log(request.file)
    
    const {userName,email,password} = request.body

    if (!userName || !password || !email) {
    return response.status(400).send({message: "All fields are required"})
    } 
    
    try {
        const existingUser = await User.findOne({
            $or: [{email}, {userName}],
        })

        if (existingUser) {
            return response.status(400).send({ message: "User with this email or username already exist" })      
        }
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            userName,
            email,
            password: hashedPassword,
            profilePic: request.file ? request.file.path : null,
        }


        const createdUser = await User.create(newUser)
        if (!createdUser) {
            return response.status(400).send({ error: "User not created" })
        }


        generateTokenAndSetCookie(createdUser._id, response)

        response.status(201).send({user: createdUser, message: "User successfully created"})
    }
    catch (error) {
        console.error(error)
        response.status(500).send({message: "Server Error"})
    }
}

// Logout
export const logout = async (request, response) => {
    response.cookie("jwt", "", {
        maxAge: 0
    })
    response.status(200).send({message: "Logged out successfully"})
}


