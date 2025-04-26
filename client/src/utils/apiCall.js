import axios from "axios";

//to get all the elements
export const getAllElements = async () => {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/elements", {
        withCredentials: true,
    });
    return res.data;
};

//to get all the elements of particular user
export const getUserElements = async (userId) => {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/elements/user/${userId}`, {
        withCredentials: true,
    });
    return res.data;
};


export const logoutUser = async () => {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/logout", {
        withCredentials: true,
    });
    return res.data;
};
