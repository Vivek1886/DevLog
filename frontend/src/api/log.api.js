import api from "./axios";

export const createLogApi = async (data) => {
    const res = await api.post("/logs", data);
    return res.data;
}
export const getLogsApi = async (filters = {}) => {
    const res = await api.get("/logs", { params: filters });
    return res.data;
};

export const getLogByIdApi = async (id) => {
    const res = await api.get(`/logs/${id}`);
    return res.data;
};

export const updateLogApi = async (id, data) => {
    const res = await api.patch(`/logs/${id}`, data);
    return res.data;
};

export const deleteLogApi = async (id) => {
    const res = await api.delete(`/logs/${id}`);
    return res.data;
};