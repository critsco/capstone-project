import React from "react";
import { Col, Layout, Row } from "antd";

import FacultyCalendar from "./components/FacultyCalendar/FacultyCalendar";
import FacultyScheduleTable from "./components/FacultyScheduleTable/FacultyScheduleTable";
import FacultyInternTable from "./components/FacultyInternTable/FacultyInternTable";

export default function PageFacultyDashboard() {
    return (
        <Layout.Content>
            <Row gutter={[30, 0]}>
                <Col xs={24} sm={24} md={14} lg={14}>
                    <div className="dashboard-title">Calendar</div>
                    <FacultyCalendar />
                </Col>
                <Col xs={24} sm={24} md={10} lg={10}>
                    <div className="dashboard-title">Upcoming Schedules</div>
                    <FacultyScheduleTable />
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="dashboard-title">Intern Status</div>
                    <FacultyInternTable />
                </Col>
            </Row>
        </Layout.Content>
    );
}
