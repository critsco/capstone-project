import React from "react";
import { Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";

import { GET } from "../../../providers/useAxiosQuery";
import { userData } from "../../../providers/companyInfo";

export default function StudentNavList() {
    const location = useLocation();
    const userdata = userData();

    const { data: dataProfile } = GET(
        `api/profile/${userdata.id}`,
        "profile_list"
    );

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
                {dataProfile?.data.company_id ? (
                    <Link to="/documents">
                        <Button
                            type="text"
                            className={`${
                                location.pathname === "/documents"
                                    ? "selected"
                                    : ""
                            }`}
                        >
                            Documents
                        </Button>
                    </Link>
                ) : null}
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
