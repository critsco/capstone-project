import React from "react";
import { Col, Layout, Row } from "antd";

// import DocumentSearchBar from "./components/DocumentSearchBar";
// import DocumentSidebar from "./components/DocumentSidebar";
// import DocumentCard from "./components/DocumentCard";

export default function PageFacultyDocuments() {
    return (
        <Layout.Content>
            <Row>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <DocumentSearchBar />
                </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
                <Col xs={24} sm={24} md={5} lg={5}>
                    <DocumentSidebar />
                </Col>
                <Col xs={24} sm={24} md={19} lg={19}>
                    <DocumentCard />
                </Col>
            </Row>
        </Layout.Content>
    );
}
