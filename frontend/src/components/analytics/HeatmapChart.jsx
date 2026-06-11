import { eachDayOfInterval, subYears, format, getDay } from "date-fns";

const HeatmapChart = ({ data = [] }) => {
    const today = new Date();
    const yearAgo = subYears(today, 1);
    const allDays = eachDayOfInterval({ start: yearAgo, end: today });

    // Map date string → count
    const countMap = {};
    data.forEach((d) => { countMap[d.date] = d.count; });

    const getColor = (count) => {
        if (!count) return "var(--color-border)";
        if (count === 1) return "rgba(57,255,133,0.25)";
        if (count === 2) return "rgba(57,255,133,0.50)";
        if (count === 3) return "rgba(57,255,133,0.75)";
        return "var(--color-accent)";
    };

    // Group by week columns
    const weeks = [];
    let currentWeek = [];

    // Pad first week
    const firstDow = getDay(allDays[0]);
    for (let i = 0; i < firstDow; i++) currentWeek.push(null);

    allDays.forEach((day) => {
        currentWeek.push(day);
        if (getDay(day) === 6) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });
    if (currentWeek.length) weeks.push(currentWeek);

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, di) => {
                            const day = week[di];
                            const dateStr = day ? format(day, "yyyy-MM-dd") : null;
                            const count = dateStr ? countMap[dateStr] || 0 : null;

                            return (
                                <div
                                    key={di}
                                    title={dateStr ? `${dateStr}: ${count} log(s)` : ""}
                                    className="w-3 h-3 rounded-sm transition-all
                                               duration-150 hover:scale-125"
                                    style={{
                                        background: day ? getColor(count) : "transparent",
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3">
                <span className="font-mono text-[0.6rem] text-muted">Less</span>
                {[0, 1, 2, 3, 4].map((n) => (
                    <div
                        key={n}
                        className="w-3 h-3 rounded-sm"
                        style={{ background: getColor(n) }}
                    />
                ))}
                <span className="font-mono text-[0.6rem] text-muted">More</span>
            </div>
        </div>
    );
};

export default HeatmapChart;