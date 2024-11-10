import React from "react";
import { Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function StudentNavList() {
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
