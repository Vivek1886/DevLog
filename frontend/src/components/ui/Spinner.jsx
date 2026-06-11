const Spinner = ({ size = "md", color = "var(--color-accent)" }) => {
    const sizes = { sm: "16px", md: "28px", lg: "44px" };
    const dim = sizes[size];

    return (
        <>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    animation: spin 0.7s linear infinite;
                    border-radius: 50%;
                    display: inline-block;
                    flex-shrink: 0;
                }
            `}</style>
            <div
                className="spinner"
                style={{
                    width: dim,
                    height: dim,
                    border: "2px solid var(--color-border-2)",
                    borderTop: `2px solid ${color}`,
                }}
            />
        </>
    );
};

export const PageSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-bg">
        <Spinner size="lg" />
    </div>
);

export default Spinner;