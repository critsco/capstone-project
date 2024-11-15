import React, { useState } from "react";
import { Button, Col, Flex, Layout, Row, Segmented, Upload } from "antd";

import StatusTable from "./components/StatusTable/StatusTable";
import StudentCalendar from "./components/StudentCalendar/StudentCalendar";
import LogList from "./components/LogList/LogList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function DashboardContent() {
    const [sort, setSort] = useState([]);

    return (
        <Layout.Content>
            <Row gutter={[20, 0]}>
                <Col xs={24} sm={24} md={17} lg={17}>
                    <div className="dashboard-title">My Documents Status</div>
                    <StatusTable />
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
                    <Flex gap={10} align="center">
                        <div className="dashboard-title">Daily Logs</div>
                        <Segmented
                            options={["Latest", "Oldest"]}
                            onChange={(value) => {
                                setSort(value);
                            }}
                        />
                    </Flex>
                    <Flex flex={1} gap={16}>
                        <Upload listType="picture-card">
                            <FontAwesomeIcon icon={faPlus} />
                            Add Log
                        </Upload>
                        <LogList sort={sort} />
                    </Flex>
                </Col>
            </Row>
        </Layout.Content>
    );
}
