import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import useLogStore from "../store/logStore";
import useUiStore from "../store/uiStore";
import { useAnalytics } from "../hooks/useAnalytics";
import LogCard from "../components/logs/LogCard";
import StreakCounter from "../components/analytics/StreakCounter";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";

const StatCard = ({ label, value, sub }) => (
    <div className="bg-surface border border-border rounded-lg p-5
                    hover:border-border-2 transition-colors duration-150">
        <p className="font-mono text-[0.65rem] text-muted uppercase
                      tracking-widest mb-2">
            {label}
        </p>
        <p className="font-display font-black text-3xl text-accent leading-none">
            {value}
        </p>
        {sub && (
            <p className="font-mono text-xs text-muted mt-1">{sub}</p>
        )}
    </div>
);

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { setPageTitle } = useUiStore();
    const { logs, fetchLogs, isLoading } = useLogStore();
    const { summary, streak, isLoading: analyticsLoading } = useAnalytics();

    useEffect(() => {
        setPageTitle("Dashboard");
        fetchLogs({ limit: 5 });
    }, []);

    // Check if user logged today
    const today = new Date().toISOString().split("T")[0];
    const loggedToday = logs.some(
        (l) => new Date(l.date).toISOString().split("T")[0] === today
    );

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">

            {/* ── Greeting ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="font-display font-black text-3xl text-text
                               tracking-tight">
                    Hey, {user?.username} 👋
                </h2>
                <p className="text-muted text-sm mt-1">
                    {loggedToday
                        ? "You've logged today. Keep the streak alive! 🔥"
                        : "You haven't logged today yet. What did you build?"}
                </p>
            </motion.div>

            {/* ── Today status banner ── */}
            {!loggedToday && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center justify-between bg-accent-dim
                               border border-accent/30 rounded-lg px-5 py-4"
                >
                    <div>
                        <p className="font-display font-bold text-accent text-sm">
                            No log yet today
                        </p>
                        <p className="font-mono text-xs text-muted mt-0.5">
                            Don't break your streak — log your work now
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/logs/new")}
                        className="px-4 py-2 bg-accent text-bg text-xs font-bold
                                   font-body rounded hover:opacity-85 transition-opacity
                                   duration-150 cursor-pointer border-none shrink-0"
                    >
                        + Add Log
                    </button>
                </motion.div>
            )}

            {/* ── Stats row ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                <StreakCounter value={streak?.currentStreak ?? 0} />
                <StatCard
                    label="Hours this week"
                    value={summary?.totalHoursWeek?.toFixed(1) ?? "0"}
                    sub="hrs logged"
                />
                <StatCard
                    label="Hours this month"
                    value={summary?.totalHoursMonth?.toFixed(1) ?? "0"}
                    sub="hrs logged"
                />
                <StatCard
                    label="Logs this month"
                    value={summary?.totalLogsMonth ?? "0"}
                    sub="total entries"
                />
            </motion.div>

            {/* ── Recent logs ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-lg text-text">
                        Recent Logs
                    </h3>
                    <button
                        onClick={() => navigate("/logs")}
                        className="font-mono text-xs text-accent hover:opacity-75
                                   transition-opacity bg-transparent border-none
                                   cursor-pointer"
                    >
                        View all →
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Spinner />
                    </div>
                ) : logs.length === 0 ? (
                    <EmptyState
                        icon="📋"
                        title="No logs yet"
                        message="Start by logging what you worked on today."
                        action={{ label: "+ Add your first log", onClick: () => navigate("/logs/new") }}
                    />
                ) : (
                    <div className="flex flex-col gap-3">
                        {logs.slice(0, 5).map((log, i) => (
                            <motion.div
                                key={log._id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                            >
                                <LogCard log={log} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default DashboardPage;