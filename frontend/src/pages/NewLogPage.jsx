import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useLogStore from "../store/logStore";
import useUiStore from "../store/uiStore";
import LogForm from "../components/logs/LogForm";

const NewLogPage = () => {
    const navigate = useNavigate();
    const { setPageTitle } = useUiStore();
    const { createLog, isLoading } = useLogStore();

    useEffect(() => { setPageTitle("New Log"); }, []);

    const handleSubmit = async (data) => {
        const success = await createLog(data);
        if (success) navigate("/logs");
    };

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
                        New Log
                    </h2>
                    <p className="text-muted text-sm mt-1">
                        What did you work on today?
                    </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <LogForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
            </motion.div>
        </div>
    );
};

export default NewLogPage;