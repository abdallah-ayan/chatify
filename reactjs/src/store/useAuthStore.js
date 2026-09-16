import { create } from "zustand";

export const useAuthStore = create(( set)=> ({
    isLoggedIn : false ,
    isLoading : true ,
    login : () => {
        set({isLoggedIn : true , isLoading : true});
    }
}))