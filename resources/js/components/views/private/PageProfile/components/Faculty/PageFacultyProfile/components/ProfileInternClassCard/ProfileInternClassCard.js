import React from "react";

import { Button, Col, Flex, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { faTrashXmark } from "@fortawesome/pro-regular-svg-icons";

export default function ProfileInternClassCard() {
    return (
        <div className="card">
            <Flex
                className="card-header"
                align="center"
                justify="space-between"
            >
                <div
                    style={{
                        color: "#2c3d8f",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    Interns
                </div>
            </Flex>
            <Flex vertical className="card-body" gap="14px">
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={4} lg={4}>
                        <Button className="add-card">
                            <Flex
                                gap={4}
                                align="center"
                                justify="center"
                                style={{ fontSize: "14px" }}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Class
                            </Flex>
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={4} lg={4}>
                        <Flex
                            className="class-card"
                            vertical
                            justify="space-between"
                        >
                            <div className="class-title">BSIT24</div>
                            <Flex gap={6}>
                                <Button className="open-btn">Open Class</Button>
                                <Button className="delete-btn">
                                    <FontAwesomeIcon
                                        icon={faTrashXmark}
                                        size="lg"
                                    />
                                </Button>
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
            </Flex>
        </div>
    );
}
