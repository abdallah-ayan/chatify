import { create } from "zustand";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    allCantacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") ?? false,


    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContanct: asyncErrorHandler(async () => {
        set({ isUsersLoading: true })
        const res = await axiosInstance.get("/message/contects")
        set({ allCantacts: res.data.data.users })
        set({ isUsersLoading: false })
    }, set, { isUsersLoading: false }),

    getMyChatPartners: asyncErrorHandler(async () => {
        set({ isUsersLoading: true })
        const res = await axiosInstance.get("/message/chat")
        set({ isUsersLoading: false })
        set({ chats: res.data.data.users })
    }, set, { isUsersLoading: false }),

    getMessagesByUserId: asyncErrorHandler(
        async (userId) => {
            set({ isMessagesLoading: true })
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ isMessagesLoading: false })
            set({ messages: res.data.data.messages })
        }
        , set, { isMessagesLoading: false }),

    sendMessage: asyncErrorHandler(
        async (data) => {
            const { selectedUser } = get();

            const { authUser } = useAuthStore.getState();

            const tempId = `temp-${Date.now()}`;

            const optimisticMessage = {
                _id: tempId,
                senderId: authUser._id,
                receiverId: selectedUser._id,
                text: data.text,
                image: data.image,
                createdAt: new Date().toISOString(),
                isOptimistic: true
            };

            // إظهار الرسالة مباشرة
            set({
                messages: [...get().messages, optimisticMessage]
            });

            // إرسالها للسيرفر
            const res = await axiosInstance.post(
                `/message/send/${selectedUser._id}`,
                data
            );

            // جلب آخر نسخة من الرسائل
            const currentMessages = get().messages;

            // حذف المؤقتة وإضافة الحقيقية
            set({
                messages: [
                    ...currentMessages.filter(
                        (msg) => msg._id !== tempId
                    ),
                    res.data.data
                ]
            });

            return true;
        },
        set
    ),


    subscribeToMessages: () => {

        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            // const isMessageSentFromSelectedUser = newMessage.senderId == selectedUser._id
            // if(!isMessageSentFromSelectedUser) return
            const currentMessages = get().messages;

            set({
                messages: [...currentMessages, newMessage]
            });

            const notificationSound = new Audio("/sounds/notification.mp3")
            if (get().isSoundEnabled){
                notificationSound.currentTime = 0;
                notificationSound.play().catch(() => { });
            }
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.off("newMessage");
    }
}));