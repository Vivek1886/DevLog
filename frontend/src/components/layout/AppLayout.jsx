import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ConfirmDialog from "../ui/ConfirmDialog";
import useUiStore from "../../store/uiStore";

const PAGE_TITLES = {
    "/dashboard": "Dashboard",
    "/logs": "My Logs",
    "/logs/new": "New Log",
    "/analytics": "Analytics",
};

const AppLayout = () => {
    const location = useLocation();
    const { setPageTitle } = useUiStore();

    useEffect(() => {
        const title = PAGE_TITLES[location.pathname] || "DevLog";
        setPageTitle(title);
    }, [location.pathname]);

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            overflow: "hidden",
            background: "var(--color-bg)"
        }}>
            <Sidebar />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
                minWidth: 0,
            }}>
                <h1>shigs</h1>
                <Topbar />
                <main style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "24px",
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
            <ConfirmDialog />
        </div>
    );
};

export default AppLayout;