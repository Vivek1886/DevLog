import { useState, useEffect } from "react";
import {
    getSummaryApi,
    getStreakApi,
    getHeatmapApi,
    getTopTagsApi,
    getMoodDistributionApi,
    getWeeklyHoursApi,
} from "../api/analytics.api";

export const useAnalytics = () => {
    const [summary, setSummary] = useState(null);
    const [streak, setStreak] = useState(null);
    const [heatmap, setHeatmap] = useState([]);
    const [topTags, setTopTags] = useState([]);
    const [moodDistribution, setMoodDistribution] = useState([]);
    const [weeklyHours, setWeeklyHours] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAll = async () => {
        setIsLoading(true);
        try {
            const [s, st, h, t, m, w] = await Promise.all([
                getSummaryApi(),
                getStreakApi(),
                getHeatmapApi(),
                getTopTagsApi(),
                getMoodDistributionApi(),
                getWeeklyHoursApi(),
            ]);
            setSummary(s.data);
            setStreak(st.data);
            setHeatmap(h.data);
            setTopTags(t.data);
            setMoodDistribution(m.data);
            setWeeklyHours(w.data);
        } catch (err) {
            console.error("Analytics fetch failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    return {
        summary, streak, heatmap,
        topTags, moodDistribution, weeklyHours,
        isLoading, refetch: fetchAll,
    };
};