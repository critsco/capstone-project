import React from "react";
import { Col, Layout, Row } from "antd";
import ApprovedListTable from "./components/ApprovedListTable/ApprovedListTable";

export default function PageCompanies() {
    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <ApprovedListTable />
                </Col>
            </Row>
        </Layout.Content>
    );
}
