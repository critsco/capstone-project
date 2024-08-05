import React, { useEffect, useState } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Row,
    Table,
} from "antd";
import FacultyCalendar from "./components/FacultyCalendar";
import TableSortRadio from "./components/TableSortRadio";
import VisitationTable from "./components/VisitationTable";
import OthersTable from "./components/OthersTable";

export default function FacultyCalendarPage(props) {
    const { title } = props;
    const [selectedSort, setSelectedSort] = useState("visitation");

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_calendar">
            <Navbar />
            <Layout.Content>
                <Row gutter={[50, 20]} style={{ paddingInline: "250px" }}>
                    <Col xs={24} sm={24} md={20} lg={20}>
                        <FacultyCalendar />
                    </Col>
                </Row>
                <Row
                    gutter={[50, 20]}
                    style={{ marginTop: "20px" }}
                    className="schedule-row"
                >
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Flex
                            gap={12}
                            style={{ marginInline: "50px" }}
                            align="center"
                        >
                            <div style={{ fontWeight: "bold" }}>
                                Upcoming Schedule
                            </div>
                            <TableSortRadio setSelectedSort={setSelectedSort} />
                        </Flex>
                        {selectedSort === "visitation" ? (
                            <VisitationTable />
                        ) : (
                            <OthersTable />
                        )}
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
