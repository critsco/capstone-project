import React from "react";

import { Card, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEye } from "@fortawesome/pro-regular-svg-icons";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import { faDesktop } from "@fortawesome/pro-solid-svg-icons";

export default function FacultyFeaturesCard() {
    return (
        <Card id="facultyfeaturescard">
            <div className="Feature">Features</div>

            <Row justify="space-between" align="middle">
                <Card
                    style={{
                        border: "0",
                        borderRadius: "0",
                        background: "#2c3d8f",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />
                    <div className="FeatureTitle">
                        Calendar & Schedule Viewing
                    </div>
                    <p className="FeatureDesc">
                        Provides real-time updates on the status of submitted
                        paperwork, keeping students informed.
                    </p>
                </Card>
                <Divider
                    type="vertical"
                    style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        height: "125px",
                    }}
                />
                <Card
                    style={{
                        border: "0",
                        borderRadius: "0",
                        background: "#2c3d8f",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faClock}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />

                    <div className="FeatureTitle">Visitation Scheduling</div>
                    <p className="FeatureDesc">
                        Streamlined visitation scheduling improves coordination
                        between practicum instructors and organizations.
                    </p>
                </Card>
            </Row>

            <Row justify="space-between" align="middle">
                <Card
                    style={{
                        border: "0",
                        borderRadius: "0",
                        background: "#2c3d8f",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faEye}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />

                    <div className="FeatureTitle">Intern Status Viewing</div>
                    <p className="FeatureDesc">
                        Equipping practicum instructors with document status
                        visibility enhances workflow, identifies bottlenecks,
                        and promotes timely task completion, boosting
                        productivity.
                    </p>
                </Card>
                <Divider
                    type="vertical"
                    style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        height: "125px",
                    }}
                />
                <Card
                    style={{
                        border: "0",
                        borderRadius: "0",
                        background: "#2c3d8f",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faDesktop}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />

                    <div className="FeatureTitle">
                        Paperwork Monitoring Board
                    </div>
                    <p className="FeatureDesc">
                        Practicum instructors can efficiently track the status
                        and progress of intern documents, offering timely
                        support, pinpointing areas for enhancement.
                    </p>
                </Card>
            </Row>
        </Card>
    );
}
