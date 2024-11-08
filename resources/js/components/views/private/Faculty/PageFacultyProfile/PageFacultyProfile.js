import React from "react";
import { Avatar, Button, Col, Flex, Layout, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import ProfileGenInfoCard from "./components/ProfileGenInfoCard";
import ProfileInternClassCard from "./components/ProfileInternClassCard";

export default function FacultyProfilePage() {
    return (
        <Layout id="page_faculty_profile">
            <Navbar />
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
                            <div
                                style={{ fontWeight: "bold", fontSize: "24px" }}
                            >
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
                                    Your image should be in PNG or JPG format
                                    and must not exceed 10 MB.
                                </Flex>
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <ProfileGenInfoCard />
                    </Col>
                </Row>
                <Row style={{ marginTop: "-8px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <ProfileInternClassCard />
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
