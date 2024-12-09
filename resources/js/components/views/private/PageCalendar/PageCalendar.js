import React, { useState } from "react";
import { Button, Col, Flex, Layout, Row, Segmented } from "antd";

import VisitationTable from "./components/VisitationTable/VisitationTable";
import OthersTable from "./components/OthersTable/OthersTable";
import ScheduleModalForm from "./components/ScheduleModalForm/ScheduleModalForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function PageCalendar() {
    const [sort, setSort] = useState("Visitation");
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        data: null,
    });

    return (
        <Layout.Content>
            {/* <Row gutter={[8, 0]}>
                <Col xs={21} sm={21} md={21} lg={21}>
                    <FacultyCalendar />
                </Col>
            </Row> */}
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
                        <Flex gap={6}>
                            <Button
                                className="add-btn"
                                onClick={() =>
                                    setToggleModalForm({
                                        open: true,
                                    })
                                }
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Schedule
                            </Button>
                            <Link to="/calendar/archive">
                                <Button className="archive-btn">Archive</Button>
                            </Link>
                        </Flex>
                    </Flex>

                    {sort === "Visitation" ? (
                        <VisitationTable
                            setToggleModalForm={setToggleModalForm}
                        />
                    ) : (
                        <OthersTable setToggleModalForm={setToggleModalForm} />
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
