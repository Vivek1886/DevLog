import useLogStore from "../../store/logStore";

const MOODS = ["", "focused", "motivated", "tired", "blocked", "okay"];

const LogFilters = () => {
    const { filters, setFilters, resetFilters } = useLogStore();

    const hasActiveFilters =
        filters.mood || filters.tag || filters.startDate || filters.endDate;

    return (
        <div className="bg-surface border border-border rounded-lg p-4
                        flex flex-wrap gap-3 items-end">

            {/* Mood filter */}
            <div className="flex flex-col gap-1">
                <label className="font-mono text-[0.65rem] text-muted
                                  uppercase tracking-widest">
                    Mood
                </label>
                <select
                    value={filters.mood}
                    onChange={(e) => setFilters({ mood: e.target.value })}
                    className="bg-surface border border-border rounded px-3 py-1.5
                               text-xs font-mono text-text outline-none
                               focus:border-accent cursor-pointer
                               transition-colors duration-150"
                >
                    {MOODS.map((m) => (
                        <option key={m} value={m}>
                            {m === "" ? "All moods" : m}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tag filter */}
            <div className="flex flex-col gap-1">
                <label className="font-mono text-[0.65rem] text-muted
                                  uppercase tracking-widest">
                    Tag
                </label>
                <input
                    type="text"
                    placeholder="e.g. nodejs"
                    value={filters.tag}
                    onChange={(e) => setFilters({ tag: e.target.value })}
                    className="bg-surface border border-border rounded px-3 py-1.5
                               text-xs font-mono text-text outline-none w-28
                               placeholder:text-muted focus:border-accent
                               transition-colors duration-150"
                />
            </div>

            {/* Date range */}
            <div className="flex flex-col gap-1">
                <label className="font-mono text-[0.65rem] text-muted
                                  uppercase tracking-widest">
                    From
                </label>
                <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ startDate: e.target.value })}
                    className="bg-surface border border-border rounded px-3 py-1.5
                               text-xs font-mono text-text outline-none
                               focus:border-accent transition-colors duration-150
                               cursor-pointer"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-mono text-[0.65rem] text-muted
                                  uppercase tracking-widest">
                    To
                </label>
                <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ endDate: e.target.value })}
                    className="bg-surface border border-border rounded px-3 py-1.5
                               text-xs font-mono text-text outline-none
                               focus:border-accent transition-colors duration-150
                               cursor-pointer"
                />
            </div>

            {/* Reset */}
            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="font-mono text-xs text-danger border border-danger/30
                               rounded px-3 py-1.5 hover:bg-danger/10
                               transition-all duration-150 cursor-pointer
                               bg-transparent self-end"
                >
                    ✕ reset
                </button>
            )}
        </div>
    );
};

export default LogFilters;