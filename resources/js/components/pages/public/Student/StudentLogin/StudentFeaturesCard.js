import React from "react";

import { Card, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolderOpen, faList } from "@fortawesome/pro-solid-svg-icons";
import { faFilePdf } from "@fortawesome/pro-regular-svg-icons";

export default function StudentFeaturesCard() {
    return (
        <Card
            id="studentfeaturescard"
            style={{
                minHeight: "100%",
                border: "0",
                borderRadius: "0",
                background: "#2c3d8f",
                color: "white",
                textAlign: "center",
                paddingInline: "5%",
                alignContent: "center",
            }}
        >
            <div className="Feature">Features</div>

            <Row
                className="d-flex align-items-center"
                style={{ justifyContent: "space-between" }}
            >
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
                        icon={faCode}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />

                    <div className="FeatureTitle">Automated Formatting</div>
                    <p className="FeatureDesc">
                        Saves student time and ensuring documents meet
                        institutional standards for professionalism and quality.
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
                        icon={faFilePdf}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />
                    <div className="FeatureTitle">Export Ease</div>
                    <p className="FeatureDesc">
                        Enabling document export from the portal enhances both
                        convenience and accessibility.
                    </p>
                </Card>
            </Row>

            <Row
                className="d-flex align-items-center"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
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
                        icon={faList}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />
                    <div className="FeatureTitle">Paperwork Status</div>
                    <p className="FeatureDesc">
                        Provides real-time updates on the status of submitted
                        paperwork, ensuring transparency and timely follow-up.
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
                        icon={faFolderOpen}
                        style={{
                            fontSize: "44px",
                            color: "#BDC1CA",
                            paddingBottom: "8px",
                        }}
                    />
                    <div className="FeatureTitle">Daily Logs</div>
                    <p className="FeatureDesc">
                        Students can keep detailed daily time records and
                        progress tracking essential for self-assessment and goal
                        setting.
                    </p>
                </Card>
            </Row>
        </Card>
    );
}
