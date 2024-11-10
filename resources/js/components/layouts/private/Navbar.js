import React from "react";
import { Badge, Button, Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-light-svg-icons";
import { faBell } from "@fortawesome/pro-solid-svg-icons";

import { userData } from "../../providers/companyInfo";
import FacultyNavList from "./components/FacultyNavList";
import StudentNavList from "./components/StudentNavList";

export default function Navbar() {
    const userdata = userData();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
        window.location.reload();
    };

    return (
        <div className="navbar">
            <Flex justify="space-between" align="center">
                <div className="header-title">
                    {userdata.user_role_id === 1
                        ? "Faculty Portal"
                        : "Student Portal"}
                </div>

                {userdata.user_role_id === 1 ? (
                    <FacultyNavList />
                ) : (
                    <StudentNavList />
                )}

                <Flex className="right-side" align="center" gap={10}>
                    {userdata.user_role_id === 2 ? (
                        <Button type="text" className="bell-btn">
                            <Badge count={1} size="small" offset={[2, 0]}>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    style={{
                                        fontSize: "20px",
                                        color: "#565D6D",
                                    }}
                                />
                            </Badge>
                        </Button>
                    ) : null}

                    <Button
                        type="text"
                        className="logout-btn"
                        onClick={() => handleLogout()}
                    >
                        <Flex align="center" gap={4}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            Logout
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
}
