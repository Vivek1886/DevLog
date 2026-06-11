import api from "./axios";

export const getMyProfileApi = async () => {
    const res = await api.get("/profile/me");
    return res.data;
};

export const updateMyProfileApi = async (data) => {
    const res = await api.patch("/profile/me", data);
    return res.data;
};

export const updateAvatarApi = async (avatar) => {
    const res = await api.patch("/profile/me/avatar", { avatar });
    return res.data;
};

// Public — no token needed
export const getPublicProfileApi = async (username) => {
    const res = await api.get(`/profile/u/${username}`);
    return res.data;
};