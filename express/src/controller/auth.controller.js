import User  from "../model/User.js";
import Res from "../utils/Res.js";
import { generateToken } from "../lib/utils.js";
import emailTemplate from "../template/emailTemplate.js";
import sendEmail from "../utils/email.js"
export const login = (req, res) => {
    res.send("Login");
}



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

export const logout = (req, res) => {
    res.send("Logout");
}
