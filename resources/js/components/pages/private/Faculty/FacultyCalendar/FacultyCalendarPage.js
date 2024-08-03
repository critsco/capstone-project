import React, { useEffect, useState } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Row,
    Table,
} from "antd";
import FacultyCalendar from "./components/FacultyCalendar";
import TableSortRadio from "./components/TableSortRadio";
import VisitationTable from "./components/VisitationTable";
import OthersTable from "./components/OthersTable";
import SetSchedule from "./components/SetSchedule";
import EditSchedule from "./components/EditSchedule";

export default function FacultyCalendarPage(props) {
    const { title } = props;
    const [selectedSort, setSelectedSort] = useState("visitation");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    const handleSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        console.log("Selected Row Keys: ", newSelectedRowKeys);
        console.log("Selected Rows: ", newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectedRows);
    };
    const handleRowUpdate = (updatedRow) => {
        setSelectedRows((prev) =>
            prev.map((row) =>
                row.id === updatedRow.id ? { ...row, ...updatedRow } : row
            )
        );
    };

    return (
        <Layout id="page_faculty_calendar">
            <Navbar />
            <Layout.Content>
                <Row gutter={[50, 20]} style={{ paddingInline: "250px" }}>
                    <Col xs={24} sm={24} md={20} lg={20}>
                        <FacultyCalendar />
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={4}
                        lg={4}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Flex vertical gap={10} className="calendar-buttons">
                            <SetSchedule />
                            <EditSchedule
                                selectedRowKeys={selectedRowKeys}
                                selectedRows={selectedRows}
                                onRowUpdate={handleRowUpdate}
                            />
                            <Button
                                style={{
                                    background: "#C12126",
                                    color: "white",
                                }}
                            >
                                Remove
                            </Button>
                        </Flex>
                    </Col>
                </Row>
                <Row
                    gutter={[50, 20]}
                    style={{ marginTop: "20px" }}
                    className="schedule-row"
                >
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Flex
                            gap={12}
                            style={{ marginInline: "50px" }}
                            align="center"
                        >
                            <div style={{ fontWeight: "bold" }}>
                                Upcoming Schedule
                            </div>
                            <TableSortRadio setSelectedSort={setSelectedSort} />
                        </Flex>
                        {selectedSort === "visitation" ? (
                            <VisitationTable
                                selectedRowKeys={selectedRowKeys}
                                onSelectChange={handleSelectChange}
                            />
                        ) : (
                            <OthersTable
                                selectedRowKeys={selectedRowKeys}
                                onSelectChange={handleSelectChange}
                            />
                        )}
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}
