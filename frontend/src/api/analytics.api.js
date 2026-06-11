import api from "./axios";

export const getSummaryApi = async () => {
    const res = await api.get("/analytics/summary");
    return res.data;
};

export const getStreakApi = async () => {
    const res = await api.get("/analytics/streak");
    return res.data;
};

export const getHeatmapApi = async () => {
    const res = await api.get("/analytics/heatmap");
    return res.data;
};

export const getTopTagsApi = async () => {
    const res = await api.get("/analytics/tags");
    return res.data;
};

export const getMoodDistributionApi = async () => {
    const res = await api.get("/analytics/mood");
    return res.data;
};

export const getWeeklyHoursApi = async () => {
    const res = await api.get("/analytics/weekly-hours");
    return res.data;
};