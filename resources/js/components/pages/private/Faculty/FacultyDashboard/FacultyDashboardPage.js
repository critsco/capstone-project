import React, { useEffect } from "react";

import { Col, Layout, Row } from "antd";
import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import FacultyScheduleTable from "./components/FacultyDashboardScheduleTable";
import FacultyCalendar from "./components/FacultyDashboardCalendar";
import FacultyInternTable from "./components/FacultyDashboardInternTable";

export default function FacultyDashboardPage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_dashboard">
            <Navbar />
            <Layout.Content>
                <Row gutter={[50, 20]}>
                    <Col xs={24} sm={24} md={14} lg={16}>
                        <div className="dashboard-title">Calendar</div>
                        <FacultyCalendar />
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={8}>
                        <div className="dashboard-title">
                            Upcoming Schedules
                        </div>
                        <div className="faculty-dashboard-schedule">
                            <FacultyScheduleTable />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[0, 20]} style={{ marginTop: "20px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="dashboard-title">Intern Status</div>
                        <FacultyInternTable />
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
