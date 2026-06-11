import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getPublicProfileApi } from "../api/profile.api";
import HeatmapChart from "../components/analytics/HeatmapChart";
import MoodBadge from "../components/logs/MoodBadge";
import Spinner from "../components/ui/Spinner";
import { format } from "date-fns";

const AVATAR_COLORS = {
    avatar1: "#39ff85",
    avatar2: "#60a5fa",
    avatar3: "#a78bfa",
    avatar4: "#ffb347",
    avatar5: "#ff4d4d",
    avatar6: "#f472b6",
};

const PublicProfilePage = () => {
    const { username } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getPublicProfileApi(username);
                setData(res.data);
            } catch (error) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (notFound || !data) {
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-3">
                <span className="text-4xl">👻</span>
                <h2 className="font-display font-bold text-xl text-text">
                    User not found
                </h2>
                <p className="font-mono text-sm text-muted">
                    @{username} doesn't exist
                </p>
            </div>
        );
    }

    const { user, stats, recentLogs, heatmap } = data;
    const avatarColor = AVATAR_COLORS[user?.avatar] || "#39ff85";

    return (
        <div className="min-h-screen bg-bg">
            {/* Navbar */}
            <nav className="flex items-center px-8 py-5 border-b border-border">
                <div className="flex items-center gap-2 font-display text-xl font-extrabold text-accent tracking-tight">
                    <span className="bg-accent text-bg w-6 h-6 rounded text-xs font-black flex items-center justify-center">
                        D
                    </span>
                    DevLog
                </div>
            </nav>

            <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-5"
                >
                    <div
                        className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-display font-black text-2xl text-bg shrink-0"
                        style={{
                            background: avatarColor,
                            borderColor: avatarColor,
                        }}
                    >
                        {user?.username?.[0]?.toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <h1 className="font-display font-black text-2xl text-text tracking-tight">
                            {user.username}
                        </h1>

                        {user.bio && (
                            <p className="text-muted text-sm mt-1 leading-relaxed">
                                {user.bio}
                            </p>
                        )}

                        {user.githubUrl && (
                            <a
                                href={user.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-mono text-xs text-accent hover:opacity-75 transition-opacity duration-150 mt-2 inline-block"
                            >
                                ↗ GitHub
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="grid grid-cols-3 gap-4"
                >
                    {[
                        {
                            label: "Total Logs",
                            value: stats?.totalLogs ?? 0,
                        },
                        {
                            label: "Total Hours",
                            value: stats?.totalHours?.toFixed(1) ?? "0.0",
                        },
                        {
                            label: "Member Since",
                            value: format(
                                new Date(user.createdAt),
                                "MMM yyyy"
                            ),
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="bg-surface border border-border rounded-lg p-4 text-center"
                        >
                            <p className="font-display font-black text-2xl text-accent">
                                {item.value}
                            </p>
                            <p className="font-mono text-[0.65rem] text-muted uppercase tracking-widest mt-1">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-surface border border-border rounded-lg p-6"
                >
                    <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                        Activity
                    </p>

                    <HeatmapChart data={heatmap || []} />
                </motion.div>

                {/* Recent Logs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                        Recent Work
                    </p>

                    {!recentLogs?.length ? (
                        <p className="text-muted font-mono text-sm text-center py-8">
                            No logs yet
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {recentLogs.map((log) => (
                                <div
                                    key={log._id}
                                    className="bg-surface border border-border rounded-lg p-4 border-l-2 border-l-accent hover:border-border transition-colors duration-150"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-display font-bold text-sm text-text truncate">
                                                    {log.title}
                                                </h4>

                                                <MoodBadge mood={log.mood} />
                                            </div>

                                            {log.tags?.length > 0 && (
                                                <div className="flex gap-1.5 flex-wrap mt-2">
                                                    {log.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="font-mono text-[0.65rem] px-2 py-0.5 bg-accent-dim text-accent rounded border border-accent/20"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                            <span className="font-mono text-xs text-muted">
                                                {format(
                                                    new Date(log.date),
                                                    "MMM d"
                                                )}
                                            </span>

                                            <span className="font-mono text-xs text-accent font-bold">
                                                {log.hoursSpent}h
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PublicProfilePage;