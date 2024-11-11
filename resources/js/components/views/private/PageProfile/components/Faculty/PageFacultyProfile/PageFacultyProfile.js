import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Flex, Layout, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../../../../providers/useAxiosQuery";
import { userData } from "../../../../../../providers/companyInfo";
import ProfileGenInfoCard from "./components/ProfileGenInfoCard/ProfileGenInfoCard";
import ProfileInternClassCard from "./components/ProfileInternClassCard/ProfileInternClassCard";

export default function PageFacultyProfile() {
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
                <Col sm={3} md={3} lg={3}>
                    <Avatar
                        style={{ background: "#2c3d8f" }}
                        size={128}
                        icon={<FontAwesomeIcon icon={faUser} />}
                    />
                </Col>
                <Col sm={21} md={21} lg={21}>
                    <Flex vertical gap={20}>
                        <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                            Rejeenald Miras Flores (200841)
                        </div>
                        <Flex gap={8} align="center">
                            <Button className="image">Choose Image</Button>
                            <Button className="remove">Remove</Button>
                            <Flex
                                align="center"
                                gap={4}
                                style={{
                                    color: "#9095A1",
                                    fontSize: "14px",
                                }}
                            >
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
            <Row style={{ marginTop: "-8px" }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <ProfileInternClassCard />
                </Col>
            </Row>
        </Layout.Content>
    );
}
