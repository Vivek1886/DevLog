import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children, width = "480px" }) => {

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.7)",
                            backdropFilter: "blur(4px)",
                            zIndex: 100,
                        }}
                    />

                    {/* Modal box */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: `min(${width}, 90vw)`,
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border-2)",
                            borderRadius: "6px",
                            padding: "1.5rem",
                            zIndex: 101,
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1.25rem",
                        }}>
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "var(--color-text)",
                                margin: 0,
                            }}>
                                {title}
                            </h3>

                            <button
                                onClick={onClose}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--color-muted)",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    padding: "0.25rem",
                                    lineHeight: 1,
                                    transition: "color var(--transition-fast)",
                                }}
                                onMouseEnter={(e) => e.target.style.color = "var(--color-text)"}
                                onMouseLeave={(e) => e.target.style.color = "var(--color-muted)"}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;