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






    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);  