import { useNavigate } from "react-router-dom";
import useLogStore from "../../store/logStore";
import useUiStore from "../../store/uiStore";
import MoodBadge from "./MoodBadge";
import { format } from "date-fns";

const LogCard = ({ log }) => {
    const navigate = useNavigate();
    const { deleteLog } = useLogStore();
    const { openConfirm } = useUiStore();

    const handleDelete = () => {
        openConfirm({
            title: "Delete Log",
            message: `Delete "${log.title}"? This cannot be undone.`,
            onConfirm: () => deleteLog(log._id),
        });
    };

    return (
        <div className="bg-surface border border-border rounded-lg p-4
                        hover:border-border-2 transition-all duration-150
                        border-l-2 border-l-accent group">
            <div className="flex items-start justify-between gap-4">

                {/* Left content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display font-bold text-sm text-text
                                       truncate">
                            {log.title}
                        </h4>
                        <MoodBadge mood={log.mood} />
                    </div>

                    {log.description && (
                        <p className="text-muted text-xs mt-1 leading-relaxed
                                      line-clamp-2">
                            {log.description}
                        </p>
                    )}

                    {/* Tags */}
                    {log.tags?.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap mt-2">
                            {log.tags.map((tag) => (
                                <span key={tag}
                                    className="font-mono text-[0.65rem] px-2 py-0.5
                                               bg-accent-dim text-accent rounded
                                               border border-accent/20">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: meta + actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-mono text-xs text-muted">
                        {format(new Date(log.date), "MMM d")}
                    </span>
                    <span className="font-mono text-xs text-accent font-bold">
                        {log.hoursSpent}h
                    </span>

                    {/* Actions — visible on hover */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-150">
                        <button
                            onClick={() => navigate(`/logs/${log._id}/edit`)}
                            className="font-mono text-[0.65rem] text-muted px-2 py-1
                                       border border-border rounded hover:text-text
                                       hover:border-border-2 transition-all duration-150
                                       cursor-pointer bg-transparent"
                        >
                            edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="font-mono text-[0.65rem] text-muted px-2 py-1
                                       border border-border rounded hover:text-danger
                                       hover:border-danger transition-all duration-150
                                       cursor-pointer bg-transparent"
                        >
                            del
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogCard;