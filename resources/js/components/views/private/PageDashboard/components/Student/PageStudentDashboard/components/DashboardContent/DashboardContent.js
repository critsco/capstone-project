import React from "react";
import { Col, Layout, Row } from "antd";
import StatusTable from "./components/StatusTable/StatusTable";

export default function DashboardContent() {
    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={18} lg={18} offset={3}>
                    <div className="dashboard-title">My Documents Status</div>
                    <StatusTable />
                </Col>
            </Row>
        </Layout.Content>
    );
}
