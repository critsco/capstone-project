import React, { useState } from "react";
import { Col, Layout, Row } from "antd";

import DocumentSearchBar from "./components/DocumentSearchBar/DocumentSearchBar";
import DocumentSidebar from "./components/DocumentSidebar/DocumentSidebar";
import DocumentCard from "./components/DocumentCard/DocumentCard";

export default function PageFacultyDocuments() {
    const [selectedDocument, setSelectedDocument] = useState();
    const [toggleTemplateModalForm, setToggleTemplateModalForm] = useState({
        open: false,
        data: null,
    });
    const [toggleVariableModalForm, setToggleVariableModalForm] = useState({
        open: false,
        data: null,
    });
    const [filter, setFilter] = useState({
        search: "",
        type: selectedDocument || "",
    });

    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <DocumentSearchBar />
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: "30px",
                    boxShadow: "2px 4px 8px rgba(23, 26, 31, 0.12)",
                    borderRadius: "8px",
                }}
            >
                <Col xs={24} sm={24} md={6} lg={6}>
                    <DocumentSidebar
                        setSelectedDocument={setSelectedDocument}
                        toggleTemplateModalForm={toggleTemplateModalForm}
                        setToggleTemplateModalForm={setToggleTemplateModalForm}
                        toggleVariableModalForm={toggleVariableModalForm}
                        setToggleVariableModalForm={setToggleVariableModalForm}
                    />
                </Col>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <DocumentCard selectedDocument={selectedDocument} />
                </Col>
            </Row>
        </Layout.Content>
    );
}
