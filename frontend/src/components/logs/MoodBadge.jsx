const MOOD_CONFIG = {
    focused: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.25)", emoji: "🎯" },
    motivated: { color: "#39ff85", bg: "rgba(57,255,133,0.1)", border: "rgba(57,255,133,0.25)", emoji: "⚡" },
    tired: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)", emoji: "😴" },
    blocked: { color: "#ff4d4d", bg: "rgba(255,77,77,0.1)", border: "rgba(255,77,77,0.25)", emoji: "🚫" },
    okay: { color: "#ffb347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)", emoji: "👍" },
};

const MoodBadge = ({ mood }) => {
    const cfg = MOOD_CONFIG[mood] || MOOD_CONFIG.okay;

    return (
        <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded
                       font-mono text-[0.65rem] uppercase tracking-wider border"
            style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
        >
            {cfg.emoji} {mood}
        </span>
    );
};

export default MoodBadge;
export { MOOD_CONFIG };