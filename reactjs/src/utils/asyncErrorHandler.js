import toast from "react-hot-toast";

export default function (func, set) {
    return async (...args) => {
        try {
            await func(...args);
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message);
            set({ isSigningUp: false });
            return false;
        }
    };
}