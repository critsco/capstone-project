import React, { useEffect } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import { Col, Layout, Row } from "antd";
import DocumentSearchBar from "./components/DocumentSearchBar";
import DocumentSidebar from "./components/DocumentSidebar";

export default function FacultyDocumentsPage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_documents">
            <Navbar />
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
                        Documents
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
