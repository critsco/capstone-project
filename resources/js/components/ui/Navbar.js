import { faArrowRightFromBracket } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <Flex id="navbar" justify="space-between" align="center">
            <div style={{ fontSize: "16px" }}>Faculty Portal</div>
            <Flex className="nav-buttons" justify="space-between">
                <Button
                    type="text"
                    className={`${
                        location.pathname === "/faculty/dashboard"
                            ? "selected"
                            : ""
                    }`}
                    href="/faculty/dashboard"
                >
                    Dashboard
                </Button>
                <Button
                    type="text"
                    className={`${
                        location.pathname === "/faculty/internstatus"
                            ? "selected"
                            : ""
                    }`}
                    href="/faculty/internstatus"
                >
                    Intern Status
                </Button>
                <Button
                    type="text"
                    className={`${
                        location.pathname === "/faculty/documents"
                            ? "selected"
                            : ""
                    }`}
                    href="/faculty/documents"
                >
                    Documents
                </Button>
                <Button
                    type="text"
                    className={`${
                        location.pathname === "/faculty/calendar"
                            ? "selected"
                            : ""
                    }`}
                    href="/faculty/calendar"
                >
                    Calendar
                </Button>
                <Button
                    type="text"
                    className={`${
                        location.pathname === "/faculty/profile"
                            ? "selected"
                            : ""
                    }`}
                    href="/faculty/profile"
                >
                    Profile
                </Button>
            </Flex>
            <Button
                type="text"
                style={{ textDecoration: "none" }}
                href="/faculty"
            >
                <Flex align="center" gap={4}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Logout
                </Flex>
            </Button>
        </Flex>
    );
}
