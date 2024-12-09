import React from "react";
import { Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function FacultyNavList() {
    const location = useLocation();

    return (
        <>
            <Flex className="nav-buttons" justify="space-between">
                <Link to="/dashboard">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/dashboard" ? "selected" : ""
                        }`}
                    >
                        Dashboard
                    </Button>
                </Link>
                <Link to="/intern-status">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/intern-status"
                                ? "selected"
                                : ""
                        }`}
                    >
                        Intern Status
                    </Button>
                </Link>
                <Link to="/companies">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/companies" ||
                            location.pathname === "/companies/archive"
                                ? "selected"
                                : ""
                        }`}
                    >
                        Companies
                    </Button>
                </Link>
                <Link to="/documents">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/documents" ? "selected" : ""
                        }`}
                    >
                        Documents
                    </Button>
                </Link>
                <Link to="/calendar">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/calendar" ||
                            location.pathname === "/calendar/archive"
                                ? "selected"
                                : ""
                        }`}
                    >
                        Calendar
                    </Button>
                </Link>
                <Link to="/profile">
                    <Button
                        type="text"
                        className={`${
                            location.pathname === "/profile" ? "selected" : ""
                        }`}
                    >
                        Profile
                    </Button>
                </Link>
            </Flex>
        </>
    );
}
