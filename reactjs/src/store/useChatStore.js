import { create } from "zustand";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set , get) => ({
    allCantacts : [] ,
    chats : [] ,
    messages : [] , 
    activeTab : "chats" ,
    selectedUser : null ,
    isUsersLoading : false , 
    isMessagesLoading : false ,
    isSoundEnabled : localStorage.getItem("isSoundEnabled") ?? false , 


    toggleSound : (state) => {
        localStorage.setItem("isSoundEnabled" , !get().isSoundEnabled)
        set({isSoundEnabled :  !get().isSoundEnabled})
    } ,

    setActiovTap : (tab) => set({activeTab : tab }),
    setSelectedUser : (user) => set({selectedUser : user }) ,

    getAllContanct : asyncErrorHandler(async () => {
        set({isUsersLoading : true})
        const res = await axiosInstance.get("/message/contects")
        set({allCantacts : res.data.data.users})
        set({isUsersLoading : false})
    } , set , {isUsersLoading : false}) ,

    getMyChatPartners : asyncErrorHandler(async () => {
        set({isUsersLoading : true})
        const res = await axiosInstance.get("/message/chat")
        set({isUsersLoading : false})
        set({chats : res.data.data.users})
    } , set , {isUsersLoading : false})

}));