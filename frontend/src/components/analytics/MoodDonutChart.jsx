import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MOOD_CONFIG } from "../logs/MoodBadge";

const MoodDonutChart = ({ data = [] }) => {
    if (!data.length) return (
        <p className="text-muted font-mono text-xs text-center py-8">
            No mood data yet
        </p>
    );

    return (
        <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="mood"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={3}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.mood}
                                fill={MOOD_CONFIG[entry.mood]?.color || "#666"}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(val, name) => [`${val} logs`, name]}
                        contentStyle={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border-2)",
                            borderRadius: "4px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-col gap-1.5">
                {data.map((d) => (
                    <div key={d.mood} className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: MOOD_CONFIG[d.mood]?.color }}
                        />
                        <span className="font-mono text-[0.65rem] text-muted capitalize">
                            {d.mood}
                        </span>
                        <span className="font-mono text-[0.65rem] text-accent ml-auto">
                            {d.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodDonutChart;