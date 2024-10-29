import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ClearCache from "react-clear-cache";
import { Button, Layout } from "antd";
import { lineSpinner } from "ldrs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts, faRefresh } from "@fortawesome/pro-regular-svg-icons";

import AuthContext from "../../../context/AuthContext";
import { bgColor, name } from "../../providers/companyInfo";
import Footer from "./Footer";
import Navbar from "./Navbar";

lineSpinner.register();

export default function Private(props) {
	const {
		children,
		moduleName,
		// moduleCode,
		title,
		pageId,
		className,
		allowedRoles,
	} = props;

	const { authTokens, user } = useContext(AuthContext);

	useEffect(() => {
		const section = document.querySelector(".private-layout");
		section.scrollIntoView({ behavior: "smooth", block: "start" });

		document.title = (moduleName ?? title) + " | " + name;
	}, [title, moduleName]);

	// Redirect to login if user is not authenticated
	if (!authTokens) return <Navigate to="/" />;

	// Check if the user has the appropriate role
	if (!allowedRoles.includes(user.user_role)) {
		// Redirect to the respective dashboard if role is unauthorized
		const redirectPath =
			user.user_role === 1 ? "/faculty/dashboard" : "/dashboard";
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<ClearCache>
			{({ isLatestVersion, emptyCacheStorage }) => (
				<>
					{!isLatestVersion && (
						<div className="notification-notice">
							<div className="notification-notice-content">
								<div className="notification-notice-icon">
									<FontAwesomeIcon icon={faGifts} />
								</div>
								<div className="notification-notice-message">
									<div className="title">Updates Now Available</div>
									<div className="description">
										A new version of this Web App is ready
									</div>
									<div className="action">
										<Button
											onClick={(e) => {
												e.preventDefault();
												emptyCacheStorage();
											}}
											icon={<FontAwesomeIcon icon={faRefresh} />}
										>
											Refresh
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="globalLoading hide">
						<l-line-spinner size="50" stroke="5" speed="1" color={bgColor} />
					</div>

					<Layout
						className={`private-layout ${className ?? ""}`}
						id={pageId ?? ""}
					>
						<Navbar />
						{children}
						<Footer />
					</Layout>
				</>
			)}
		</ClearCache>
	);
}
