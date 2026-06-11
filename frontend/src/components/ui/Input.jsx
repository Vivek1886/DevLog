import { forwardRef } from "react";

// Handles: text, email, password, number, textarea
const Input = forwardRef(({
    label,
    error,
    hint,
    type = "text",
    textarea = false,
    rows = 4,
    prefix,       // icon or text before input
    suffix,       // icon or text after input
    fullWidth = true,
    style = {},
    ...props
}, ref) => {

    const inputStyle = {
        width: fullWidth ? "100%" : "auto",
        background: "var(--color-surface)",
        border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border)"}`,
        borderRadius: "4px",
        padding: prefix ? "0.625rem 0.875rem 0.625rem 2.5rem"
            : "0.625rem 0.875rem",
        color: "var(--color-text)",
        fontFamily: "var(--font-body)",
        fontSize: "0.9rem",
        outline: "none",
        transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
        resize: textarea ? "vertical" : undefined,
        ...style,
    };

    return (
        <div style={{ width: fullWidth ? "100%" : "auto" }}>

            {/* Label */}
            {label && (
                <label style={{
                    display: "block",
                    marginBottom: "0.375rem",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                }}>
                    {label}
                </label>
            )}

            {/* Input wrapper */}
            <div style={{ position: "relative" }}>

                {/* Prefix icon */}
                {prefix && (
                    <span style={{
                        position: "absolute",
                        left: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-muted)",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        {prefix}
                    </span>
                )}

                {textarea ? (
                    <textarea
                        ref={ref}
                        rows={rows}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = "var(--color-accent)";
                            e.target.style.boxShadow = "0 0 0 3px var(--color-accent-glow)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = error
                                ? "var(--color-danger)"
                                : "var(--color-border)";
                            e.target.style.boxShadow = "none";
                        }}
                        {...props}
                    />
                ) : (
                    <input
                        ref={ref}
                        type={type}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = "var(--color-accent)";
                            e.target.style.boxShadow = "0 0 0 3px var(--color-accent-glow)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = error
                                ? "var(--color-danger)"
                                : "var(--color-border)";
                            e.target.style.boxShadow = "none";
                        }}
                        {...props}
                    />
                )}

                {/* Suffix */}
                {suffix && (
                    <span style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-muted)",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        {suffix}
                    </span>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p style={{
                    marginTop: "0.375rem",
                    fontSize: "0.78rem",
                    color: "var(--color-danger)",
                    fontFamily: "var(--font-mono)",
                }}>
                    {error}
                </p>
            )}

            {/* Hint text */}
            {hint && !error && (
                <p style={{
                    marginTop: "0.375rem",
                    fontSize: "0.78rem",
                    color: "var(--color-muted)",
                }}>
                    {hint}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";
export default Input;