import { create } from "zustand";
import {
    getLogsApi,
    createLogApi,
    updateLogApi,
    deleteLogApi,
} from "../api/log.api";
import toast from "react-hot-toast";

const useLogStore = create((set, get) => ({
    logs: [],
    pagination: null,
    isLoading: false,

    // Active filters — shared across LogsPage + FilterBar
    filters: {
        mood: "",
        tag: "",
        startDate: "",
        endDate: "",
        page: 1,
        limit: 10,
    },

    // ─── Fetch logs (with current filters) ───────────────────
    fetchLogs: async (overrideFilters = {}) => {
        set({ isLoading: true });
        try {
            const filters = { ...get().filters, ...overrideFilters };

            // Remove empty filters before sending to API
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== "")
            );

            const res = await getLogsApi(cleanFilters);
            set({
                logs: res.data.logs,
                pagination: res.data.pagination,
            });
        } catch (err) {
            toast.error("Failed to fetch logs");
        } finally {
            set({ isLoading: false });
        }
    },

    // ─── Create log ───────────────────────────────────────────
    createLog: async (data) => {
        set({ isLoading: true });
        try {
            await createLogApi(data);
            toast.success("Log created ✅");
            await get().fetchLogs(); // refresh list
            return true;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to create log";
            toast.error(message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    // ─── Update log ───────────────────────────────────────────
    updateLog: async (id, data) => {
        set({ isLoading: true });
        try {
            await updateLogApi(id, data);
            toast.success("Log updated ✅");
            await get().fetchLogs(); // refresh list
            return true;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update log";
            toast.error(message);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    // ─── Delete log ───────────────────────────────────────────
    deleteLog: async (id) => {
        try {
            await deleteLogApi(id);
            // Optimistic update — remove from list immediately
            set((state) => ({
                logs: state.logs.filter((log) => log._id !== id),
            }));
            toast.success("Log deleted");
        } catch (err) {
            toast.error("Failed to delete log");
        }
    },

    // ─── Set filters ──────────────────────────────────────────
    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters, page: 1 },
        }));
    },

    // ─── Reset filters ────────────────────────────────────────
    resetFilters: () => {
        set({
            filters: {
                mood: "", tag: "", startDate: "",
                endDate: "", page: 1, limit: 10,
            },
        });
    },

    // ─── Change page ──────────────────────────────────────────
    setPage: (page) => {
        set((state) => ({ filters: { ...state.filters, page } }));
        get().fetchLogs();
    },
}));

export default useLogStore;