import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUiStore from "../../store/uiStore";
import useAuthStore from "../../store/authStore";

const Topbar = () => {
    const { toggleSidebar, pageTitle } = useUiStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <motion.header
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-[60px] bg-surface border-b border-border
                       flex items-center justify-between px-5
                       sticky top-0 z-40"
        >
            {/* ── Left: hamburger + page title ── */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="flex flex-col gap-1 cursor-pointer bg-transparent
                               border-none p-1 group"
                    aria-label="Toggle sidebar"
                >
                    <span className="block w-5 h-px bg-muted
                                     group-hover:bg-text transition-colors duration-150" />
                    <span className="block w-3 h-px bg-muted
                                     group-hover:bg-text transition-colors duration-150" />
                    <span className="block w-5 h-px bg-muted
                                     group-hover:bg-text transition-colors duration-150" />
                </button>

                <h1 className="font-display text-base font-bold text-text
                               tracking-tight">
                    {pageTitle}
                </h1>
            </div>

            {/* ── Right: new log button + profile ── */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate("/logs/new")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded
                               bg-accent text-bg text-xs font-semibold font-body
                               hover:opacity-85 transition-opacity duration-150
                               cursor-pointer border-none"
                >
                    <span className="text-sm font-bold">+</span>
                    New Log
                </button>

                {/* Profile link */}
                <button
                    onClick={() => navigate(`/u/${user?.username}`)}
                    className="w-8 h-8 rounded-full bg-accent-dim border border-accent
                               flex items-center justify-center font-display text-sm
                               font-bold text-accent hover:opacity-80 transition-opacity
                               duration-150 cursor-pointer"
                >
                    {user?.username?.[0]?.toUpperCase() || "?"}
                </button>
            </div>
        </motion.header>
    );
};

export default Topbar;