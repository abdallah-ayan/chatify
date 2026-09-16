import User  from "../model/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";
import Res from "../utils/Res.js";
import cloudinary from "../lib/cloudinary.js";


export const updateProfile = asyncErrorHandler(async (req , res) => {
   const { profilePic } = req.body ;
   if (!profilePic) throw new customError("Please provide a profile picture.", 400);
   const userId = req.user._id;
   const uploadResult = await cloudinary.uploader.upload(profilePic)
   const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResult.secure_url} , {new : true});
   Res(res).status(200).state("sucess").message("has been updated user sucessfuly !").data({user : updatedUser}).end();
});