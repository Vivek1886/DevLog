import { create } from "zustand";
import { loginApi, logoutApi, registerApi } from "../api/auth.api"
import toast from "react-hot-toast"


const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,

    initAuth: () => {
        try {
            const token = localStorage.getItem("accessToken"); // plain string
            const user = localStorage.getItem("user");        // JSON string

            if (token && user) {
                set({
                    accessToken: token,             // ← no JSON.parse
                    user: JSON.parse(user),  // ← still parse user
                    isLoggedIn: true,
                });
            }
        } catch (err) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        }
    },
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", JSON.stringify)
        set({ accessToken: token });
    },

    register: async (data) => {
        set({ isLoading: true });
        try {
            await registerApi(data);
            toast.success("Account Created Sucessfully")
            return true
        } catch (error) {
            const message = err.response?.data?.message || "Registration failed";
            toast.error(message);
            return false;
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (data) => {
        set({ isLoading: true });
        try {
            const res = await loginApi(data);
            const { user, accessToken } = res.data;

            // ✅ store as plain string — no JSON.stringify needed for a string token
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));

            set({ user, accessToken, isLoggedIn: true });
            toast.success(`Welcome back, ${user.username} 👋`);
            return true;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            toast.error(message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        try {
            await logoutApi();
        } catch (_) {
            // even if API fails, clear local state
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            set({ user: null, accessToken: null, isLoggedIn: false });
        }
    },
    updateUser: (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser });
    },

}));

export default useAuthStore;
