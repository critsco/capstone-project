import React, { useEffect } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import { Button, Col, Layout, Row } from "antd";
import FacultyCalendar from "./components/FacultyCalendar";

export default function FacultyCalendarPage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_calendar">
            <Navbar />
            <Layout.Content>
                <Row gutter={[50, 20]}>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <FacultyCalendar />
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Button>Set</Button>
                        <Button>Edit</Button>
                        <Button>Remove</Button>
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
