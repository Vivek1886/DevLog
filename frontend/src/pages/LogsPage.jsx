import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useLogStore from "../store/logStore";
import useUiStore from "../store/uiStore";
import LogCard from "../components/logs/LogCard";
import LogFilters from "../components/logs/LogFilters";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";

const LogsPage = () => {
    const navigate = useNavigate();
    const { setPageTitle } = useUiStore();
    const {
        logs, pagination, isLoading,
        fetchLogs, setPage, filters,
    } = useLogStore();

    useEffect(() => {
        setPageTitle("My Logs");
        fetchLogs();
    }, []);

    // Refetch when filters change
    useEffect(() => {
        fetchLogs();
    }, [filters.mood, filters.tag, filters.startDate, filters.endDate]);

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-display font-black text-2xl text-text
                                   tracking-tight">
                        My Logs
                    </h2>
                    <p className="text-muted text-sm mt-0.5">
                        {pagination?.total ?? 0} total entries
                    </p>
                </div>
                <Button size="sm" onClick={() => navigate("/logs/new")}>
                    + New Log
                </Button>
            </div>

            {/* ── Filters ── */}
            <LogFilters />

            {/* ── List ── */}
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : logs.length === 0 ? (
                <EmptyState
                    icon="📭"
                    title="No logs found"
                    message="Try adjusting your filters or add a new log."
                    action={{ label: "+ New Log", onClick: () => navigate("/logs/new") }}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {logs.map((log, i) => (
                        <motion.div
                            key={log._id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.04 }}
                        >
                            <LogCard log={log} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                        disabled={pagination.page <= 1}
                        onClick={() => setPage(pagination.page - 1)}
                        className="font-mono text-xs px-3 py-1.5 rounded
                                   border border-border text-muted
                                   hover:text-text hover:border-border-2
                                   disabled:opacity-30 disabled:cursor-not-allowed
                                   transition-all duration-150 cursor-pointer
                                   bg-transparent"
                    >
                        ← prev
                    </button>

                    <span className="font-mono text-xs text-muted px-2">
                        {pagination.page} / {pagination.totalPages}
                    </span>

                    <button
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => setPage(pagination.page + 1)}
                        className="font-mono text-xs px-3 py-1.5 rounded
                                   border border-border text-muted
                                   hover:text-text hover:border-border-2
                                   disabled:opacity-30 disabled:cursor-not-allowed
                                   transition-all duration-150 cursor-pointer
                                   bg-transparent"
                    >
                        next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default LogsPage;