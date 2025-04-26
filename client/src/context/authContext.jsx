import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true until we check    

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/auth/user", {
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

    // Expose these through context
    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
