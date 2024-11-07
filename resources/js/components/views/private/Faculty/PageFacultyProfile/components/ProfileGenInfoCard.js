import React from "react";

import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Flex, Row } from "antd";

export default function ProfileGenInfoCard() {
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
                    General Information
                </div>
                <Button>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                </Button>
            </Flex>
            <Flex vertical className="card-body" gap="14px">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            Personnal Information
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <Flex
                            vertical
                            style={{
                                color: "#9095A1",
                                fontWeight: "200",
                            }}
                        >
                            <div>Name</div>
                            <div>Faculty ID</div>
                            <div>Email</div>
                            <div>Department</div>
                            <div>Contant Info</div>
                            <div>Gender</div>
                        </Flex>
                    </Col>
                    <Col xs={21} sm={21} md={21} lg={21}>
                        <Flex vertical>
                            <div>Rejeenald Miras Flores</div>
                            <div>200841</div>
                            <div>rmflores@urios.edu.ph</div>
                            <div>Computer Studies Program</div>
                            <div>0925645351</div>
                            <div>Male</div>
                        </Flex>
                    </Col>
                </Row>
            </Flex>
        </div>
    );
}
