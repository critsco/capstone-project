import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import PrivateLayout from "../layouts/private/Private";
import AuthContext from "../../context/AuthContext";

const PrivateRoute = (props) => {
	const { component: Component, allowedRoles } = props;
	const { authTokens, user } = useContext(AuthContext);

	if (!authTokens || !allowedRoles.includes(user.user_role)) {
		return <Navigate to="/" />;
	} else {
		return (
			<PrivateLayout {...props}>
				<Component {...props} />
			</PrivateLayout>
		);
	}
};

export default PrivateRoute;
