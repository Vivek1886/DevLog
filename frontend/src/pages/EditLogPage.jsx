import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useLogStore from "../store/logStore";
import useUiStore from "../store/uiStore";
import { getLogByIdApi } from "../api/log.api";
import LogForm from "../components/logs/LogForm";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";

const EditLogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setPageTitle } = useUiStore();
    const { updateLog, isLoading } = useLogStore();
    const [log, setLog] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setPageTitle("Edit Log");
        const fetch = async () => {
            try {
                const res = await getLogByIdApi(id);
                setLog(res.data);
            } catch {
                toast.error("Log not found");
                navigate("/logs");
            } finally {
                setFetching(false);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (data) => {
        const success = await updateLog(id, data);
        if (success) navigate("/logs");
    };

    if (fetching) return (
        <div className="flex justify-center py-20">
            <Spinner />
        </div>
    );

    return (
        <div className="max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="mb-6">
                    <h2 className="font-display font-black text-2xl text-text
                                   tracking-tight">
                        Edit Log
                    </h2>
                    <p className="text-muted text-sm mt-1 font-mono truncate">
                        {log?.title}
                    </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <LogForm
                        onSubmit={handleSubmit}
                        defaultValues={log}
                        isLoading={isLoading}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default EditLogPage;