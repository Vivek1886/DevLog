import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true, // sends cookies (refresh token) automatically
});

// ─── Request Interceptor ─────────────────────────────────────
// Attaches access token to every request automatically
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────
// On 401 → try refresh token → retry original request
// On refresh fail → logout + redirect to login

let isRefreshing = false;
let failedQueue = [];  // holds requests that came in while refreshing

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,  // success — just return
    async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Another refresh is already in progress
                // Queue this request until refresh is done
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/refresh`,
                    {},
                    { withCredentials: true }  // sends refresh token cookie
                );

                const newAccessToken = res.data.data.accessToken;

                // Update store with new token
                useAuthStore.getState().setAccessToken(newAccessToken);

                // Retry all queued requests with new token
                processQueue(null, newAccessToken);

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed — logout user
                processQueue(refreshError, null);
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;