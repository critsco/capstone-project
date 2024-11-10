import React from "react";
import { Col, Layout, Row } from "antd";

export default function DashboardContent() {
    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="dashboard-title">My Documents Status</div>
                </Col>
            </Row>
        </Layout.Content>
    );
}
