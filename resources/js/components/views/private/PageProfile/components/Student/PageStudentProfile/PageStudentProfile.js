import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Flex, Layout, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../../../../providers/useAxiosQuery";
import { userData } from "../../../../../../providers/companyInfo";
import ProfileGenInfoCard from "./components/ProfileGenInfoCard/ProfileGenInfoCard";

export default function PageStudentProfile() {
    const userdata = userData();
    const [loading, setLoading] = useState(true);

    const { data: dataProfile } = GET(
        `api/profile/${userdata.id}`,
        "profile_list"
    );

    useEffect(() => {
        if (dataProfile) {
            setLoading(false);
        }
    }, [dataProfile]);

    if (loading) {
        return (
            <div className="splash-centered">
                <div className="splash-loader">
                    <div className="splash-inner one"></div>
                    <div className="splash-inner two"></div>
                    <div className="splash-inner three"></div>
                </div>
            </div>
        );
    }

    return (
        <Layout.Content>
            <Row>
                <Col sm={4} md={4} lg={4}>
                    <Avatar
                        style={{ background: "#2c3d8f" }}
                        size={164}
                        icon={
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ fontSize: "64px" }}
                            />
                        }
                    />
                </Col>
                <Col sm={20} md={20} lg={20}>
                    <Flex vertical gap={16}>
                        <div className="profile-name">
                            {dataProfile?.data.fullname} (
                            {dataProfile?.data.school_id})
                        </div>
                        <Flex gap={8} align="center">
                            <Button className="image">Choose Image</Button>
                            <Button className="remove">Remove</Button>
                            <Flex align="center" gap={4}>
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    size="sm"
                                />
                                Your image should be in PNG or JPG format and
                                must not exceed 10 MB.
                            </Flex>
                        </Flex>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <ProfileGenInfoCard
                        dataProfile={dataProfile && dataProfile.data}
                    />
                </Col>
            </Row>
        </Layout.Content>
    );
}
