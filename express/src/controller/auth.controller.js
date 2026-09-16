import User  from "../model/User.js";
import Res from "../utils/Res.js";
import { generateToken } from "../lib/utils.js";
import emailTemplate from "../template/emailTemplate.js";
import sendEmail from "../utils/email.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";



export const signUp = asyncErrorHandler(async (req, res) => {
    const user = await User.create(req.body);
    const {fullName ,email ,profilePic} = user
    await sendEmail( user.email , "You Welcom" , emailTemplate(user.fullName , process.env.CLIENT_URL));
    Res(res).status(201).state("success").token(generateToken(user._id)).data({fullName ,email ,profilePic} ).message("User created successfully").end();  
})

export const login = asyncErrorHandler(async (req, res) => {
        const user = await User.findOne({email : req.body.email}).select("+password");

        if(user == null) 
            throw new customError("The email or password you entered is incorrect." , 400)

        if(!await user.comparePassword(req.body?.password ?? "")) 
            throw new customError("The email or password you entered is incorrect." , 400)

        const {fullName ,email ,profilePic} = user
        Res(res).status(200).state("success").token(generateToken(user._id)).data({fullName ,email ,profilePic} ).message("Login successful. Welcome back!").end();  
});

export const logout = asyncErrorHandler((req, res) => {
    Res(res).status(200).state("success").token("" , 0).message("You have been successfully logged out.").end();
});


