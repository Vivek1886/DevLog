import { create } from "zustand";

const useUiStore = create((set) => ({
    // ─── Sidebar ──────────────────────────────────────────────
    sidebarOpen: true,

    toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    setSidebarOpen: (val) =>
        set({ sidebarOpen: val }),

    // ─── Delete confirm modal ─────────────────────────────────
    // Used by ConfirmDialog component
    confirmModal: {
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    },

    openConfirm: ({ title, message, onConfirm }) =>
        set({ confirmModal: { isOpen: true, title, message, onConfirm } }),

    closeConfirm: () =>
        set({
            confirmModal: {
                isOpen: false, title: "", message: "", onConfirm: null,
            },
        }),

    // ─── Active page title (shown in Topbar) ──────────────────
    pageTitle: "Dashboard",

    setPageTitle: (title) => set({ pageTitle: title }),
}));

export default useUiStore;