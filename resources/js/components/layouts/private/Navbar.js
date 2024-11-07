import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-light-svg-icons";

export default function Navbar() {
    const location = useLocation();

    return (
        <div className="navbar">
            <Flex justify="space-between" align="center">
                <div className="header-title">Faculty Portal</div>
                <Flex className="nav-buttons" justify="space-between">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/faculty/dashboard"
                                ? "selected"
                                : ""
                        }`}
                    >
                        <Link to="/faculty/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/faculty/internstatus"
                                ? "selected"
                                : ""
                        }`}
                    >
                        <Link to="/faculty/internstatus">Intern Status</Link>
                    </Button>
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/faculty/documents"
                                ? "selected"
                                : ""
                        }`}
                    >
                        <Link to="/faculty/documents">Documents</Link>
                    </Button>
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/faculty/calendar"
                                ? "selected"
                                : ""
                        }`}
                    >
                        <Link to="/faculty/calendar">Calendar</Link>
                    </Button>
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/faculty/profile"
                                ? "selected"
                                : ""
                        }`}
                    >
                        <Link to="/faculty/profile">Profile</Link>
                    </Button>
                </Flex>
                <Button
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
