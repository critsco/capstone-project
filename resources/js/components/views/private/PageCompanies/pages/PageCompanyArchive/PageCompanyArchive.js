import React from "react";
import { Col, Layout, Row } from "antd";

import ArchiveTable from "./components/ArchiveTable/ArchiveTable";

export default function PageCompanyArchive() {
    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="dashboard-title">Archived Companies</div>
                    <ArchiveTable />
                </Col>
            </Row>
        </Layout.Content>
    );
}
