import React from "react";
import { Col, Layout, Row } from "antd";

import InternTable from "./components/InternTable/InternTable";

export default function PageInternStatus() {
    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="dashboard-title">Intern Status</div>
                    <InternTable />
                </Col>
            </Row>
        </Layout.Content>
    );
}
