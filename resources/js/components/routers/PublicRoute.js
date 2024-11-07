import React from "react";
import { Navigate } from "react-router-dom";

import PublicLayout from "../layouts/public/Public";

const isLoggedIn = localStorage.getItem("token");

const PublicRoute = ({ children, ...rest }) => {
    if (!isLoggedIn) {
        return <PublicLayout {...rest}>{children}</PublicLayout>;
    } else {
        return <Navigate to="/dashboard" />;
    }
};

export default PublicRoute;
