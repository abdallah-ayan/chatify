import User  from "../model/User.js";
import Res from "../utils/Res.js";
import { generateToken } from "../lib/utils.js";
import emailTemplate from "../template/emailTemplate.js";
import sendEmail from "../utils/email.js"



export const signUp = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const {fullName ,email ,profilePic} = user
        await sendEmail(user.fullName , user.email , "You Welcom" , emailTemplate(user.fullName , process.env.CLIENT_URL));
        Res(res).status(201).state("success").token(generateToken(user._id)).data({fullName ,email ,profilePic} ).message("User created successfully").end();  
    } catch (error) {
        Res(res).status(400).state("error").message(error.message).end();
    }
}

export const login = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email}).select("+password");

        if(user == null) return Res(res).status(400).state("error").message("The email or password you entered is incorrect.").end();

        if(!await user.comparePassword(req.body.password)) return Res(res).status(400).state("error").message("The email or password you entered is incorrect. !").end();

        const {fullName ,email ,profilePic} = user
        Res(res).status(200).state("success").token(generateToken(user._id)).data({fullName ,email ,profilePic} ).message("Login successful. Welcome back!").end();  
    }catch (err) {
        Res(res).status(500).state("error").message(err.message).end();
    }
}

export const logout = (req, res) => {
    Res(res).status(200).state("success").token("" , 0).message("You have been successfully logged out.").end();
}
