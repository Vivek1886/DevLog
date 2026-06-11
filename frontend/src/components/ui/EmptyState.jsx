import { motion } from "framer-motion";
import Button from "./Button";

const EmptyState = ({
    icon = "📭",
    title = "Nothing here yet",
    message = "",
    action,        // { label: "Add Log", onClick: fn }
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 2rem",
                textAlign: "center",
                gap: "0.75rem",
            }}
        >
            <span style={{ fontSize: "3rem", lineHeight: 1 }}>{icon}</span>

            <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "var(--color-text)",
                marginTop: "0.5rem",
            }}>
                {title}
            </h3>

            {message && (
                <p style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    maxWidth: "320px",
                    lineHeight: 1.6,
                }}>
                    {message}
                </p>
            )}

            {action && (
                <div style={{ marginTop: "0.75rem" }}>
                    <Button onClick={action.onClick} size="sm">
                        {action.label}
                    </Button>
                </div>
            )}
        </motion.div>
    );
};

export default EmptyState;