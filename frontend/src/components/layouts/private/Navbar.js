import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Flex, Layout } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-light-svg-icons";

import AuthContext from "../../../context/AuthContext";

export default function Navbar() {
	const { logoutUser } = useContext(AuthContext);

	const location = useLocation();

	const handleLogout = async () => {
		await logoutUser();
	};

	return (
		<div className="navbar">
			<Flex justify="space-between" align="center">
				<div className="header-title">Faculty Portal</div>
				<Flex className="nav-buttons" justify="space-between">
					<Button
						type="text"
						className={`${
							location.pathname === "/faculty/dashboard" ? "selected" : ""
						}`}
					>
						<Link to="/faculty/dashboard">Dashboard</Link>
					</Button>
					<Button
						type="text"
						className={`${
							location.pathname === "/faculty/internstatus" ? "selected" : ""
						}`}
					>
						<Link to="/faculty/internstatus">Intern Status</Link>
					</Button>
					<Button
						type="text"
						className={`${
							location.pathname === "/faculty/documents" ? "selected" : ""
						}`}
					>
						<Link to="/faculty/documents">Documents</Link>
					</Button>
					<Button
						type="text"
						className={`${
							location.pathname === "/faculty/calendar" ? "selected" : ""
						}`}
					>
						<Link to="/faculty/calendar">Calendar</Link>
					</Button>
					<Button
						type="text"
						className={`${
							location.pathname === "/faculty/profile" ? "selected" : ""
						}`}
					>
						<Link to="/faculty/profile">Profile</Link>
					</Button>
				</Flex>
				<Button
					onClick={handleLogout}
					type="text"
					className="logout-btn"
					style={{ textDecoration: "none" }}
				>
					<Flex align="center" gap={4}>
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
						Logout
					</Flex>
				</Button>
			</Flex>
		</div>
	);
}
