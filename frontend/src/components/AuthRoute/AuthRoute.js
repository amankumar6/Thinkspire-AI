import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Loading from "../Alert/Loading";

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, isLoading, isError } = useAuth();

    if (isLoading) {
        return <Loading />;
    }
    if (isError || isAuthenticated === false) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthRoute;
