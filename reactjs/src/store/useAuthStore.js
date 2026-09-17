import { create } from "zustand";
import { axiosInstance } from "./../lib/axios"
import toast from "react-hot-toast";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLogined : false ,
    isLogouting : false ,
    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: asyncErrorHandler(
        async (data) => {
            set({ isSigningUp: true });

            const res = await axiosInstance.post("/auth/signup", data);

            toast.success(res.data.message);
            set({ authUser: res.data.data });
            set({ isSigningUp: false });

            return true;
        },
        set ,
        { isSigningUp: false }
    ) ,

    login: asyncErrorHandler(
        async (data) => {
            set({ isLogined: true });

            const res = await axiosInstance.post("/auth/login", data);

            toast.success(res.data.message);
            set({ authUser: res.data.data });
            set({ isLogined: false });

            return true;
        },
        set ,
        { isLogined: false }
    ) ,
    logout : asyncErrorHandler(
        async (data) => {
            set({ isLogouting: true });

            const res = await axiosInstance.post("/auth/logout");

            toast.success(res.data.message);
            set({ authUser: null});
            set({ isLogouting: false });

            return true;
        },
        set ,
        { isLogouting: false }
    )

}))

