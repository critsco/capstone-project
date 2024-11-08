import React from "react";
import { Col, Layout, Row } from "antd";

import FacultyInternStatusSearchBar from "./components/FacultyInternStatusSearchBar";
import InternStatusTable from "./components/InternStatusTable";
import StatusExportButton from "./components/StatusExportButton";

export default function FacultyInternStatusPage() {
    return (
        <Layout id="page_faculty_internstatus">
            <Navbar />
            <Layout.Content>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <FacultyInternStatusSearchBar />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <InternStatusTable />
                    </Col>
                </Row>
                <Row>
                    <StatusExportButton />
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
