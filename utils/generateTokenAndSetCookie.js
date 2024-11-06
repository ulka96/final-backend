import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (id, response) => {
    // Generate the jwt
    const token = jwt.sign({id}, process.env.JWT_SECRET)

    response.cookie("jwt", token)
    return token

}