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

//add to favorite

export const addFavorite = async (userId, elementId) => {
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}/favorites`,
        { elementId },
        { withCredentials: true }
    );
    return res.data;
};

export const getFavorites = async (userId) => {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/users/${userId}/favorites`, {
        withCredentials: true
    });
    return res.data;
};

//remove from fav
export const removeFavorite = async (userId, elementId) => {
    const res = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}/favorites/remove`,
        { elementId },
        { withCredentials: true }
    );
    return res.data;
};
