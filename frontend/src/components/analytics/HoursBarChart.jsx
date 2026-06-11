import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface border border-border-2 rounded
                        px-3 py-2 font-mono text-xs">
            <p className="text-muted">{label}</p>
            <p className="text-accent font-bold mt-0.5">
                {payload[0].value}h
            </p>
        </div>
    );
};

const HoursBarChart = ({ data = [] }) => {
    const formatted = data.map((d) => ({
        day: format(new Date(d.date), "EEE"),
        hours: d.totalHours,
    }));

    return (
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data={formatted} barSize={20}>
                <XAxis
                    dataKey="day"
                    tick={{ fill: "var(--color-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: "var(--color-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                    width={25}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="hours" radius={[3, 3, 0, 0]}>
                    {formatted.map((_, i) => (
                        <Cell
                            key={i}
                            fill={i === formatted.length - 1
                                ? "var(--color-accent)"
                                : "var(--color-accent-dim)"}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HoursBarChart;