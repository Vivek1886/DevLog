import { useEffect } from "react";
import { motion } from "framer-motion";
import useUiStore from "../store/uiStore";
import { useAnalytics } from "../hooks/useAnalytics";
import HeatmapChart from "../components/analytics/HeatmapChart";
import HoursBarChart from "../components/analytics/HoursBarChart";
import TagCloud from "../components/analytics/TagCloud";
import MoodDonutChart from "../components/analytics/MoodDonutChart";
import StreakCounter from "../components/analytics/StreakCounter";
import Spinner from "../components/ui/Spinner";

const StatBox = ({ label, value, sub }) => (
    <div className="bg-surface border border-border rounded-lg p-5">
        <p className="font-mono text-[0.65rem] text-muted uppercase tracking-widest mb-2">
            {label}
        </p>
        <p className="font-display font-black text-3xl text-accent leading-none">
            {value}
        </p>
        {sub && <p className="font-mono text-xs text-muted mt-1">{sub}</p>}
    </div>
);

const AnalyticsPage = () => {
    const { setPageTitle } = useUiStore();
    const {
        summary, streak, heatmap,
        topTags, moodDistribution, weeklyHours,
        isLoading,
    } = useAnalytics();

    useEffect(() => { setPageTitle("Analytics"); }, []);

    if (isLoading) return (
        <div className="flex justify-center py-20">
            <Spinner size="lg" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="font-display font-black text-2xl text-text tracking-tight">
                    Analytics
                </h2>
                <p className="text-muted text-sm mt-1">
                    Your coding activity at a glance.
                </p>
            </motion.div>

            {/* ── Stats row ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                <StreakCounter value={streak?.currentStreak ?? 0} />
                <StatBox
                    label="Longest Streak"
                    value={streak?.longestStreak ?? 0}
                    sub="days record"
                />
                <StatBox
                    label="Hours this week"
                    value={summary?.totalHoursWeek?.toFixed(1) ?? "0"}
                    sub="hrs"
                />
                <StatBox
                    label="Hours this month"
                    value={summary?.totalHoursMonth?.toFixed(1) ?? "0"}
                    sub="hrs"
                />
            </motion.div>

            {/* ── Heatmap ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-surface border border-border rounded-lg p-6"
            >
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                    Activity — last 12 months
                </p>
                <HeatmapChart data={heatmap} />
            </motion.div>

            {/* ── Bar chart + Donut ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="bg-surface border border-border rounded-lg p-6">
                    <p className="font-mono text-xs text-muted uppercase
                                  tracking-widest mb-4">
                        Hours — last 7 days
                    </p>
                    <HoursBarChart data={weeklyHours} />
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <p className="font-mono text-xs text-muted uppercase
                                  tracking-widest mb-4">
                        Mood distribution
                    </p>
                    <MoodDonutChart data={moodDistribution} />
                </div>
            </motion.div>

            {/* ── Tag cloud ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-surface border border-border rounded-lg p-6"
            >
                <p className="font-mono text-xs text-muted uppercase
                              tracking-widest mb-4">
                    Top tags
                </p>
                <TagCloud data={topTags} />
            </motion.div>
        </div>
    );
};

export default AnalyticsPage;