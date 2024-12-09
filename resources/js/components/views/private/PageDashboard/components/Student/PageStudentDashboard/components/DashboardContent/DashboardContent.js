import React, { useState } from "react";
import { Button, Col, Flex, Layout, Row, Segmented, Upload } from "antd";

import StatusTable from "./components/StatusTable/StatusTable";
import StudentCalendar from "./components/StudentCalendar/StudentCalendar";
import ReportList from "./components/ReportList/ReportList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function DashboardContent(props) {
    const { dataProfile } = props;
    const [sort, setSort] = useState([]);

    return (
        <Layout.Content>
            <Row gutter={[20, 0]}>
                <Col xs={24} sm={24} md={17} lg={17}>
                    <div className="dashboard-title">My Documents Status</div>
                    <StatusTable dataProfile={dataProfile} />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={7}
                    lg={7}
                    style={{ marginTop: "43px" }}
                >
                    <StudentCalendar />
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Flex justify="space-between">
                        <Flex gap={10} align="center">
                            <div className="dashboard-title">Daily Reports</div>
                            <Segmented
                                options={["Latest", "Oldest"]}
                                onChange={(value) => {
                                    setSort(value);
                                }}
                            />
                        </Flex>
                        <Button className="add-report-btn">
                            <FontAwesomeIcon icon={faPlus} />
                            Add Report
                        </Button>
                    </Flex>

                    <ReportList sort={sort} />
                </Col>
            </Row>
        </Layout.Content>
    );
}
