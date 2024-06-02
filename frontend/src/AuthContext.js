import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "./services/userServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { isError, isLoading, data, isSuccess } = useQuery({
        queryFn: authAPI,
        queryKey: ["checkAuth"],
    });

    useEffect(() => {
        if (isSuccess) setIsAuthenticated(data);
    }, [data, isSuccess]);

    const loginUser = () => {
        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isError,
                isLoading,
                isSuccess,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
