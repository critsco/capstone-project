import React from "react";
import { Col, Flex, Row, Select, Table } from "antd";

import TableNotes from "./components/TableNotes/TableNotes";

const statusOptions = [
    { value: "tograde", label: "To Grade" },
    { value: "applied", label: "Applied" },
    { value: "accepted", label: "Accepted" },
    { value: "started", label: "Started" },
];
const options = [
    { value: "inprogress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

export default function FacultyInternTable() {
    const data = [
        {
            key: "1",
            name: "Oliver Wendell Ceniza",
            status: "Started",
            datestarted: "April 1, 2024",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "salamat",
            letterparent: "Completed",
            letterparentnote: "huh?",
        },
        {
            key: "2",
            name: "Jona Mae Gitalada",
            status: "Started",
            datestarted: "April 1, 2024",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "no",
            letterparent: "Completed",
            letterparentnote: "hmm",
        },
        {
            key: "3",
            name: "Jezreel Pulido",
            status: "Accepted",
            datestarted: "",
            establishment: "DTI",
            moa: "Completed",
            moanote: "huh?",
            letterparent: "Completed",
            letterparentnote: "mao?",
        },
        {
            key: "4",
            name: "Jasmine Acido",
            status: "Applied",
            datestarted: "",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "huh?",
            letterparent: "Completed",
            letterparentnote: "secret",
        },
        {
            key: "5",
            name: "Christian John Ibe",
            status: "Applied",
            datestarted: "",
            establishment: "FSUU FOUNDATION",
            moa: "Completed",
            moanote: "naol",
            letterparent: "Completed",
            letterparentnote: "yes",
        },
    ];

    return (
        <Row id="faculty-intern-status-table">
            <Col xs={24} sm={24} md={24} lg={24}>
                <Table
                    dataSource={data}
                    rowKey={(record) => record.id}
                    pagination={false}
                    bordered={true}
                >
                    <Table.Column
                        title="Intern Name"
                        key="fullname"
                        dataIndex="fullname"
                        align="center"
                        width={175}
                        sorter={true}
                        fixed="left"
                    />
                    <Table.Column
                        title="Status"
                        key="status"
                        dataIndex="status"
                        align="center"
                        width={120}
                        sorter={true}
                        render={(record) => (
                            <Select
                                options={statusOptions}
                                allowClear
                                className={`status ${
                                    record.status === "Applied" ? "applied" : ""
                                } ${
                                    record.status === "Accepted"
                                        ? "accepted"
                                        : ""
                                } ${
                                    record.status === "Started" ? "started" : ""
                                } ${
                                    record.status === "To Grade"
                                        ? "tograde"
                                        : ""
                                }`}
                            />
                        )}
                    />
                    <Table.Column
                        title="Date Started"
                        key="data_started"
                        dataIndex="data_started"
                        align="center"
                        width={100}
                    />
                    <Table.Column
                        title="Establishment"
                        key="establishment"
                        dataIndex="establishment"
                        align="center"
                        width={130}
                    />
                    <Table.Column
                        title="Memorandum of Agreement"
                        key="moa"
                        dataIndex="moa"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`moa ${
                                        record.moa === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.moa === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Letter to Parent"
                        key="ltp"
                        dataIndex="ltp"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`ltp ${
                                        record.ltp === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.ltp === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Waiver from Parent"
                        key="wfp"
                        dataIndex="wfp"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`wfp ${
                                        record.wfp === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.wfp === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Endorsement Letter"
                        key="endorsement"
                        dataIndex="endorsement"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`endorsement ${
                                        record.endorsement === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.endorsement === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Daily Time Record"
                        key="dtr"
                        dataIndex="dtr"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`dtr ${
                                        record.dtr === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.dtr === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Evaluation Form"
                        key="eval_form"
                        dataIndex="eval_form"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`eval_form ${
                                        record.eval_form === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.eval_form === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                    <Table.Column
                        title="Terminal Report"
                        key="term_rep"
                        dataIndex="term_rep"
                        align="center"
                        width={150}
                        render={(record) => (
                            <Flex gap={4} align="center">
                                <Select
                                    options={options}
                                    allowClear
                                    className={`term_rep ${
                                        record.term_rep === "In Progress"
                                            ? "inprogress"
                                            : ""
                                    } ${
                                        record.term_rep === "Completed"
                                            ? "completed"
                                            : ""
                                    }`}
                                />
                                <TableNotes />
                            </Flex>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    );
}
