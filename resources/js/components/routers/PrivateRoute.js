import React from "react";
import { Navigate } from "react-router-dom";

import PrivateLayout from "../layouts/private/Private";

const PrivateRoute = (props) => {
    const { component: Component } = props;
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
        return (
            <PrivateLayout {...props}>
                <Component {...props} />
            </PrivateLayout>
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
