import { Col, Row, Table } from "antd";
import React from "react";

export default function StatusTable() {
    const columns = [
        {
            title: "Document",
            dataIndex: "document",
            key: "document",
            width: 250,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 150,
        },
        {
            title: "Date Started",
            dataIndex: "date_started",
            key: "date_started",
            align: "center",
            width: 100,
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at",
            align: "center",
            width: 100,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            align: "center",
        },
    ];

    const dataSource = [
        {
            key: "1",
            document: "Memorandum of Agreement",
            status: "Completed",
            date_started: "2021-05-19",
            updated_at: "2021-05-19",
            note: "No note.",
        },
        {
            key: "2",
            document: "Letter to Parent",
            status: "Completed",
            date_started: "2021-05-19",
            updated_at: "2021-05-19",
            note: "No note.",
        },
        {
            key: "3",
            document: "Waiver from Parent",
            status: "Completed",
            date_started: "2021-05-19",
            updated_at: "2021-05-19",
            note: "No note.",
        },
        {
            key: "4",
            document: "Daily Time Record",
            status: "",
            date_started: "",
            updated_at: "",
            note: "",
        },
        {
            key: "5",
            document: "Evaluation Form",
            status: "",
            date_started: "",
            updated_at: "",
            note: "",
        },
        {
            key: "6",
            document: "Terminal Report",
            status: "",
            date_started: "",
            updated_at: "",
            note: "",
        },
    ];

    return (
        <Row id="tbl_wrapper">
            <Col xs={24} sm={24} md={24} lg={24}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    pagination={false}
                    size="small"
                />
            </Col>
        </Row>
    );
}
