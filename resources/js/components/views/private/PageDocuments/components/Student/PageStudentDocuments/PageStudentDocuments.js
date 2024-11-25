import React, { useState } from "react";
import { Col, Layout, Row } from "antd";

import DocumentSidebar from "./components/DocumentSidebar/DocumentSidebar";
import DocumentCard from "./components/DocumentCard/DocumentCard";

export default function PageStudentDocuments(props) {
    const { userdata } = props;
    const [selectedDocument, setSelectedDocument] = useState();

    return (
        <Layout.Content>
            <Row
                style={{
                    marginTop: "30px",
                    boxShadow: "2px 4px 8px rgba(23, 26, 31, 0.12)",
                    borderRadius: "8px",
                }}
            >
                <Col xs={24} sm={24} md={6} lg={6}>
                    <DocumentSidebar
                        userdata={userdata}
                        setSelectedDocument={setSelectedDocument}
                        selectedDocument={selectedDocument}
                    />
                </Col>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <DocumentCard selectedDocument={selectedDocument} />
                </Col>
            </Row>
        </Layout.Content>
    );
}
