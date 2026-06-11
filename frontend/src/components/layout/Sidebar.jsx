import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/authStore";
import useUiStore from "../../store/uiStore";

const NAV_ITEMS = [
    { path: "/dashboard", label: "Dashboard", icon: "⌘" },
    { path: "/logs", label: "Logs", icon: "▤" },
    { path: "/logs/new", label: "New Log", icon: "+" },
    { path: "/analytics", label: "Analytics", icon: "◈" },
];

const Sidebar = () => {
    const { user, logout } = useAuthStore();
    const { sidebarOpen } = useUiStore();
    const navigate = useNavigate();
    console.log("Sidebar render — sidebarOpen:", sidebarOpen);
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <motion.aside
            style={{
                width: "240px",
                minWidth: "240px",
                height: "100vh",
                background: "var(--color-surface)",
                borderRight: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: 0,
                overflowY: "auto",
                zIndex: 50,
            }}
        >
            {/* Logo */}
            <div style={{
                padding: "24px 20px 16px",
                borderBottom: "1px solid var(--color-border)"
            }}>
                <div style={{
                    fontFamily: "var(--font-display)", fontSize: "1.2rem",
                    fontWeight: 800, color: "var(--color-accent)",
                    display: "flex", alignItems: "center", gap: "8px"
                }}>
                    <span style={{
                        background: "var(--color-accent)", color: "var(--color-bg)",
                        width: "24px", height: "24px", borderRadius: "4px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 900
                    }}>
                        D
                    </span>
                    DevLog
                </div>
            </div>

            {/* Nav */}
            <nav style={{
                flex: 1, padding: "16px 12px",
                display: "flex", flexDirection: "column", gap: "2px"
            }}>
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: "flex", alignItems: "center", gap: "12px",
                            padding: "10px 12px", borderRadius: "4px",
                            textDecoration: "none", fontSize: "0.875rem",
                            fontFamily: "var(--font-body)",
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                            background: isActive ? "var(--color-accent-dim)" : "transparent",
                            borderLeft: isActive
                                ? "2px solid var(--color-accent)"
                                : "2px solid transparent",
                        })}
                    >
                        <span style={{
                            fontFamily: "var(--font-mono)", width: "16px",
                            textAlign: "center"
                        }}>
                            {item.icon}
                        </span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* User + Logout */}
            <div style={{
                padding: "12px", borderTop: "1px solid var(--color-border)",
                display: "flex", flexDirection: "column", gap: "8px"
            }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "8px 12px", background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)", borderRadius: "4px"
                }}>
                    <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: "var(--color-accent-dim)",
                        border: "1px solid var(--color-accent)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, color: "var(--color-accent)",
                        fontSize: "12px", flexShrink: 0
                    }}>
                        {user?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <p style={{
                            margin: 0, fontSize: "13px", fontWeight: 600,
                            color: "var(--color-text)", lineHeight: 1.3,
                            whiteSpace: "nowrap", overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                            {user?.username || "User"}
                        </p>
                        <p style={{
                            margin: 0, fontSize: "10px", color: "var(--color-muted)",
                            lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                            {user?.email || ""}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%", display: "flex", alignItems: "center",
                        gap: "8px", padding: "8px 12px", borderRadius: "4px",
                        fontSize: "13px", color: "var(--color-muted)",
                        background: "transparent", border: "1px solid transparent",
                        cursor: "pointer", fontFamily: "var(--font-body)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-danger)";
                        e.currentTarget.style.borderColor = "var(--color-danger)";
                        e.currentTarget.style.background = "rgba(255,77,77,0.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-muted)";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    <span>→</span> Logout
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;