import React from "react";
import { Col, Layout, Row } from "antd";

import DocumentSidebar from "./components/DocumentSidebar/DocumentSidebar";
import DocumentCard from "./components/DocumentCard/DocumentCard";

export default function PageStudentDocuments() {
    return (
        <Layout.Content>
            <Row style={{ marginTop: "30px" }}>
                <Col xs={24} sm={24} md={6} lg={6}>
                    <DocumentSidebar />
                </Col>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <DocumentCard />
                </Col>
            </Row>
        </Layout.Content>
    );
}
