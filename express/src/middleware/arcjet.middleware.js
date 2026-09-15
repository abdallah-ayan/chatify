import aj from "../lib/arcject.js";
import { isSpoofedBot } from "@arcjet/inspect";
import asyncErrorHandler from "./../utils/asyncErrorHandler.js"
import CustomError from "./../utils/customError.js"


export const arcjetProduction = asyncErrorHandler (async (req , res , next) => {
  const decision = await aj.protect(req)  
  if(decision.isDenied()) { // رفض الطلب
    if(decision.reason.isRateLimit()) 
        next(new CustomError("Too many requests. Please try again later.", 429))
    else if(decision.reason.isBot()) 
        next(new CustomError("Bot requests are not allowed.", 403))
    else
        next(new CustomError("Request blocked for security reasons.", 403))
  }
  if(decision.results.some(isSpoofedBot)) // بوت يتظاهر انه انسان 
        next(new CustomError("Suspicious bot activity detected.", 403))
  next()
})