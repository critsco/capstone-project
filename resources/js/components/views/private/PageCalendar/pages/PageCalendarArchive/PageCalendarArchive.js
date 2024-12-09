import React, { useState } from "react";
import { Col, Flex, Layout, Row, Segmented } from "antd";

import ArchiveVisitationTable from "./components/ArchiveVisitationTable/ArchiveVisitationTable";
import ArchiveOthersTable from "./components/ArchiveOthersTable/ArchiveOthersTable";
import ScheduleModalForm from "../../components/ScheduleModalForm/ScheduleModalForm";

export default function PageCalendar() {
    const [sort, setSort] = useState("Visitation");
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        data: null,
    });

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
                                Archived Schedules
                            </div>
                            <Segmented
                                options={["Visitation", "Others"]}
                                onChange={(value) => {
                                    setSort(value);
                                }}
                            />
                        </Flex>
                    </Flex>

                    {sort === "Visitation" ? (
                        <ArchiveVisitationTable
                            setToggleModalForm={setToggleModalForm}
                        />
                    ) : (
                        <ArchiveOthersTable
                            setToggleModalForm={setToggleModalForm}
                        />
                    )}
                </Col>
            </Row>

            <ScheduleModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </Layout.Content>
    );
}
