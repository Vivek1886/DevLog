import { motion } from "framer-motion";

const StreakCounter = ({ value }) => (
    <div className="bg-surface border border-border rounded-lg p-5
                    hover:border-accent/40 transition-colors duration-150
                    relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 bg-accent/5 opacity-0
                        hover:opacity-100 transition-opacity duration-300" />

        <p className="font-mono text-[0.65rem] text-muted uppercase
                      tracking-widest mb-2">
            Current Streak
        </p>

        <div className="flex items-end gap-2">
            <motion.p
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-display font-black text-3xl text-accent leading-none"
            >
                {value}
            </motion.p>
            <span className="font-mono text-xs text-muted mb-0.5">days</span>
            {value >= 3 && (
                <span className="text-lg mb-0.5">🔥</span>
            )}
        </div>

        <p className="font-mono text-xs text-muted mt-1">
            {value === 0 ? "Start today!" : "Keep it up!"}
        </p>
    </div>
);

export default StreakCounter;