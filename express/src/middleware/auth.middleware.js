import jwt from "jsonwebtoken"
import util from "util"
import User from "../model/User.js";
import "dotenv/config"
import customError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

export const protect = asyncErrorHandler( async (req , res , next) => {

        const token = req?.cookies?.token ?? ""
        
        const verify = util.promisify(jwt.verify);
        const payload =  await verify(token , process.env.TOKEN_KEY);
        const id = payload.userId

        const user = await User.findById(id);
        if(user == null) throw new customError("Unauthorize - invalid Token" , 401)
        
            
        req.user = user;

        next()
})