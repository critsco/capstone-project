import React, { useState } from "react";
import { Button, Col, Flex, Layout, Row, Segmented } from "antd";

import VisitationTable from "./components/VisitationTable/VisitationTable";
import OthersTable from "./components/OthersTable/OthersTable";

export default function PageCalendar() {
    const [sort, setSort] = useState([]);

    return (
        <Layout.Content>
            <Row gutter={[8, 0]}>
                <Col xs={21} sm={21} md={21} lg={21}>
                    {/* <FacultyCalendar /> */}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Flex justify="space-between">
                        <Flex gap={10} align="center">
                            <div className="dashboard-title">
                                Upcoming Schedules
                            </div>
                            <Segmented
                                options={["Visitation", "Others"]}
                                onChange={(value) => {
                                    setSort(value);
                                }}
                            />
                        </Flex>
                        <Button>Set Schedule</Button>
                    </Flex>

                    {sort === "Visitation" ? (
                        <VisitationTable />
                    ) : (
                        <OthersTable />
                    )}
                </Col>
            </Row>
        </Layout.Content>
    );
}
