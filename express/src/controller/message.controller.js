import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import Message from "../model/Message.js"
import User from "../model/User.js";
import Res from "../utils/Res.js";
import cloudinary from "../lib/cloudinary.js";
import customError from "../utils/customError.js";

export const getAllContects = asyncErrorHandler(async (req , res) => {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({_id : {$ne : loggedInUserId}});
    Res(res).status(200).length(filteredUser?.length ?? 0).state("sucess").data({users : filteredUser}).end();
}) //  users without me

export const getChatPartners = asyncErrorHandler(async (req , res) => {
    const myId = req.user._id
    const messages = await Message.find({$or : [
        {senderId : myId} ,
        {receiverId : myId}
    ]})
    const ids = [...new Set(messages.map((msg) => msg.senderId.toString() == myId.toString() ? msg.receiverId : msg.senderId ))]
    const users = await User.find({_id : {$in : ids}})
    Res(res).status(200).length(users?.length ?? 0).state("sucess").data({users}).end();
}) // users i called hem

// _id error
export const getMessagesByUserId = asyncErrorHandler(async (req , res) => {
    const myId = req.user._id ;
    const id = req?.params?.id
    const messages = await Message.find({$or : [
        {senderId : myId , receiverId : id} , 
        {senderId : id , receiverId : myId} ,
    ]}).sort({ createdAt: 1 })
    Res(res).status(200).length(messages?.length ?? 0).state("sucess").data({messages}).end();
})

export const sendMessage = asyncErrorHandler(async (req , res) => {
    const {text , image} = req.body
    const id = req?.params?.id
    const senderId = req.user._id ;
    if(!text && !image)
        throw new customError("Message must contain text or an image", 400)
    if(senderId == id)
        throw new customError("You cannot send a message to yourself", 400)
    let imageUrl ; 
    if(image) {
        const uploudResult = await cloudinary.uploader.upload(image);
        imageUrl = uploudResult.secure_url
    }
    const message = await Message.create({senderId , receiverId : id , text , image :  imageUrl})
    Res(res).status(201).state("sucess").data(message).end();
})



 