import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import PublicLayout from "../layouts/public/Public";

const PublicRoute = (props) => {
	const { component: Component } = props;
	const { authTokens, user } = useContext(AuthContext);

	if (!authTokens) {
		return (
			<PublicLayout {...props}>
				<Component {...props} />
			</PublicLayout>
		);
	} else {
		const redirectPath =
			user.user_role === 1 ? "/faculty/dashboard" : "/dashboard";

		return <Navigate to={redirectPath} replace />;
	}
};

export default PublicRoute;
