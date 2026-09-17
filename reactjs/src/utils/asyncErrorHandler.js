import toast from "react-hot-toast";

export default function (func, set , updates = undefined) {
    return async (...args) => {
        try {
            await func(...args);
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message);
            if(updates) set(updates);
            return false;
        }
    };
}