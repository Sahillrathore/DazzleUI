import { createContext, useContext, useEffect, useState } from "react";
import { getAllElements } from "../utils/apiCall";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //global state to manage the elements 
    const [allElements, setAllElements] = useState([]);
    const [loading, setLoading] = useState(true); // true until we check    
    const [notification, setNotification] = useState(null);


    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/user", {
                    credentials: "include", // important for sending cookies
                });


                if (!res.ok) throw new Error("Not authenticated");

                const data = await res.json();
                setUser(data._doc);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                setLoading(true);
                const elements = await getAllElements();
                setAllElements(elements);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch elements", err);
            }
        };

        fetchElements();
    }, []);

    // Expose these through context
    return (
        <AuthContext.Provider value={{
            user, loading,
            setUser, setLoading,
            allElements, setAllElements,
            notification, setNotification
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
