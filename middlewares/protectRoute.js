import jwt from "jsonwebtoken"

export const protectRoute = (request, response, next) => {
    const token = request.cookies.jwt

    if (!token) {
        return response.status(401).send({message: "No token, authorization denied"})
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        
        request.id = id

        next()
    } catch (err) {
        return response.status(401).send({message: "Token is not valid"})
    }
}