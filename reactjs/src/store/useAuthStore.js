import { create } from "zustand";
import { axiosInstance } from "./../lib/axios";
import toast from "react-hot-toast";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogined: false,
  isLogouting: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data.user });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: asyncErrorHandler(
    async (data) => {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success(res.data.message);
      set({ authUser: res.data.data });
      set({ isSigningUp: false });
      get().connectSocket();
      return true;
    },
    set,
    { isSigningUp: false }
  ),

  login: asyncErrorHandler(
    async (data) => {
      set({ isLogined: true });
      const res = await axiosInstance.post("/auth/login", data);
      toast.success(res.data.message);
      set({ authUser: res.data.data });
      set({ isLogined: false });
      get().connectSocket();
      return true;
    },
    set,
    { isLogined: false }
  ),

  logout: asyncErrorHandler(
    async () => {
      set({ isLogouting: true });
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
      set({ authUser: null });
      set({ isLogouting: false });
      get().disconnectSocket();
      return true;
    },
    set,
    { isLogouting: false }
  ),

  updateProfile: asyncErrorHandler(
    async (data) => {
      const res = await axiosInstance.put("/user/update-profile", { profilePic: data });
      set({ authUser: res.data.data.user });
      toast.success(res.data.message);
      return true;
    },
    set
  ),

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser) return;
    if (get().socket?.connected) return;

    const socket = io(BASE_URL, { withCredentials: true });

    socket.on("connect", () => {});

    socket.on("connect_error", (error) => {});

    socket.on("disconnect", (reason) => {});

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket?.connected) socket.disconnect();

    set({ socket: null });
  }
}));