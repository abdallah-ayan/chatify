import jwt from "jsonwebtoken"

export const generateToken = (id) => {
    return jwt.sign({userId : id} , process.env.TOKEN_KEY , {expiresIn : process.env.TOKEN_EXPAIRE } )
}