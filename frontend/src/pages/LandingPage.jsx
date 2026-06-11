import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FEATURES = [
    { icon: "▤", title: "Daily Logs", desc: "Track what you built, bugs you crushed, and hours spent every single day." },
    { icon: "◈", title: "Analytics", desc: "Streaks, heatmaps, mood trends, and weekly hours — all in one place." },
    { icon: "⌘", title: "Public Profile", desc: "Share your dev activity with a public profile. Like GitHub but for your grind." },
];

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>

            {/* ── Navbar ── */}
            <nav style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 60px", borderBottom: "1px solid var(--color-border)",
            }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-display)", fontSize: "1.25rem",
                    fontWeight: 800, color: "var(--color-accent)"
                }}>
                    <span style={{
                        background: "var(--color-accent)", color: "var(--color-bg)",
                        width: "28px", height: "28px", borderRadius: "4px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: 900
                    }}>
                        D
                    </span>
                    DevLog
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => navigate("/login")} style={{
                        padding: "10px 24px", borderRadius: "6px", fontSize: "14px",
                        fontWeight: 600, color: "var(--color-muted)", background: "transparent",
                        border: "1px solid var(--color-border)", cursor: "pointer",
                    }}>
                        Login
                    </button>
                    <button onClick={() => navigate("/register")} style={{
                        padding: "10px 24px", borderRadius: "6px", fontSize: "14px",
                        fontWeight: 700, color: "var(--color-bg)", background: "var(--color-accent)",
                        border: "none", cursor: "pointer",
                    }}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "80px 24px", gap: "24px"
            }}>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "8px 16px", borderRadius: "999px",
                        background: "var(--color-accent-dim)",
                        border: "1px solid rgba(57,255,133,0.3)"
                    }}
                >
                    <span style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: "var(--color-accent)"
                    }} />
                    <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "11px",
                        color: "var(--color-accent)", letterSpacing: "0.1em",
                        textTransform: "uppercase"
                    }}>
                        Built for developers
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{
                        fontFamily: "var(--font-display)", fontWeight: 900,
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        color: "var(--color-text)", lineHeight: 1.1,
                        maxWidth: "800px"
                    }}
                >
                    Track your{" "}
                    <span style={{ color: "var(--color-accent)" }}>dev grind.</span>
                    <br />
                    Every single day.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{
                        color: "var(--color-muted)", fontSize: "1.1rem",
                        maxWidth: "520px", lineHeight: 1.7
                    }}
                >
                    Log your daily coding activity, track streaks, visualize
                    your progress, and share your public dev profile.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}
                >
                    <button onClick={() => navigate("/register")} style={{
                        padding: "14px 36px", borderRadius: "6px", fontSize: "15px",
                        fontWeight: 700, color: "var(--color-bg)",
                        background: "var(--color-accent)", border: "none", cursor: "pointer",
                    }}>
                        Start Logging Free
                    </button>
                    <button onClick={() => navigate("/login")} style={{
                        padding: "14px 36px", borderRadius: "6px", fontSize: "15px",
                        fontWeight: 600, color: "var(--color-muted)", background: "transparent",
                        border: "1px solid var(--color-border)", cursor: "pointer",
                    }}>
                        I have an account →
                    </button>
                </motion.div>

                {/* Terminal preview */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        marginTop: "40px", width: "100%", maxWidth: "640px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)", borderRadius: "8px",
                        overflow: "hidden"
                    }}
                >
                    <div style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "12px 16px", borderBottom: "1px solid var(--color-border)"
                    }}>
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,77,77,0.6)" }} />
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,179,71,0.6)" }} />
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(57,255,133,0.6)" }} />
                        <span style={{
                            marginLeft: "12px", fontFamily: "var(--font-mono)",
                            fontSize: "12px", color: "var(--color-muted)"
                        }}>
                            devlog ~ today
                        </span>
                    </div>
                    <div style={{
                        padding: "20px", fontFamily: "var(--font-mono)",
                        fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px"
                    }}>
                        {["Built JWT refresh token flow", "Fixed MongoDB aggregation pipeline bug", "Wrote tests for auth module"].map((t) => (
                            <p key={t}>
                                <span style={{ color: "var(--color-accent)" }}>✓</span>
                                <span style={{ color: "var(--color-muted)", marginLeft: "8px" }}>{t}</span>
                            </p>
                        ))}
                        <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ color: "var(--color-warning)" }}>⏱</span>
                            <span style={{ color: "var(--color-muted)" }}>4.5 hrs — mood: focused</span>
                            <span style={{
                                marginLeft: "auto", fontSize: "12px", color: "var(--color-accent)",
                                background: "var(--color-accent-dim)", padding: "2px 8px",
                                borderRadius: "4px", border: "1px solid rgba(57,255,133,0.2)"
                            }}>
                                streak: 12 🔥
                            </span>
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ── Features ── */}
            <section style={{ padding: "80px 60px", borderTop: "1px solid var(--color-border)" }}>
                <div style={{
                    maxWidth: "1100px", margin: "0 auto",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px"
                }}>
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                            style={{
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "8px", padding: "32px"
                            }}
                        >
                            <span style={{
                                fontFamily: "var(--font-mono)", fontSize: "2rem",
                                color: "var(--color-accent)"
                            }}>
                                {f.icon}
                            </span>
                            <h3 style={{
                                fontFamily: "var(--font-display)", fontWeight: 700,
                                fontSize: "1.1rem", color: "var(--color-text)",
                                marginTop: "16px", marginBottom: "8px"
                            }}>
                                {f.title}
                            </h3>
                            <p style={{ color: "var(--color-muted)", fontSize: "14px", lineHeight: 1.7 }}>
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Footer ── */}
            <footer style={{
                padding: "20px 60px", borderTop: "1px solid var(--color-border)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-muted)" }}>
                    © 2025 DevLog
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-muted)" }}>
                    Built with Node.js + React
                </span>
            </footer>
        </div>
    );
};

export default LandingPage;