import { motion } from "framer-motion";

const variants = {
    primary: {
        background: "var(--color-accent)",
        color: "var(--color-bg)",
        border: "1px solid var(--color-accent)",
    },
    secondary: {
        background: "transparent",
        color: "var(--color-text)",
        border: "1px solid var(--color-border-2)",
    },
    danger: {
        background: "transparent",
        color: "var(--color-danger)",
        border: "1px solid var(--color-danger)",
    },
    ghost: {
        background: "transparent",
        color: "var(--color-muted)",
        border: "1px solid transparent",
    }
};


const sizes = {
    sm: { padding: "0.35rem 0.75rem", fontSize: "0.8rem" },
    md: { padding: "0.6rem 1.25rem", fontSize: "0.9rem" },
    lg: { padding: "0.75rem 1.75rem", fontSize: "1rem" },
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    onClick,
    type = "button",
    style = {},
    ...props
}) => {
    const isDisabled = disabled || loading;
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            whileHover={!isDisabled ? { opacity: 0.85 } : {}}
            whileTap={!isDisabled ? { scale: 0.97 } : {}}
            transition={{ duration: 0.1 }}
            style={{
                ...variants[variant],
                ...sizes[size],
                width: fullWidth ? "100%" : "auto",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "all var(--transition-fast)",
                whiteSpace: "nowrap",
                ...style,
            }}
            {...props}>
            {loading ? (
                <>
                    <span style={{
                        width: "14px", height: "14px",
                        border: "2px solid currentColor",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.6s linear infinite"
                    }} />
                    Loading ...
                </>
            ) : children}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.button>
    );
}
export default Button
