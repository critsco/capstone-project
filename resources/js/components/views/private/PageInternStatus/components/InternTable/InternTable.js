import React, { useEffect, useState } from "react";
import { Col, Flex, Row, Select, Table } from "antd";

import { GET, UPDATE } from "../../../../../providers/useAxiosQuery";
import TableNotes from "./components/TableNotes";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../../providers/CustomTableFilter";

const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Accepted", label: "Accepted" },
    { value: "Started", label: "Started" },
    { value: "To Grade", label: "To Grade" },
    { value: "Completed", label: "Completed" },
];
const options = [
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
];
const filterStatusOptions = [
    { value: "Applied", text: "Applied" },
    { value: "Accepted", text: "Accepted" },
    { value: "Started", text: "Started" },
    { value: "To Grade", text: "To Grade" },
    { value: "Completed", text: "Completed" },
];
const filterOptions = [
    { value: "In Progress", text: "In Progress" },
    { value: "Completed", text: "Completed" },
];

export default function InternTable() {
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 10,
        search: "",
        sort_field: "date_started",
        sort_order: "asc",
    });

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(
        `api/ojt_details?${new URLSearchParams(tableFilter)}`,
        "ojt_details_list"
    );

    const { mutate: mutateInternStatus } = UPDATE(
        `api/ojt_details`,
        "ojt_details_list"
    );

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prevState) => ({
            ...prevState,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "10",
        }));
    };

    const handleStatusChange = (id, field, value) => {
        let data = {
            [field]: value,
        };

        mutateInternStatus({ id, ...data });
    };

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <Row id="tbl-wrapper">
            <Col xs={24} sm={24} md={24} lg={24}>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <div className="tbl-top-filter">
                            <TablePageSize
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                            <TableGlobalSearch
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={24}>
                        <Table
                            dataSource={dataSource && dataSource.data.data}
                            loading={
                                isLoadingDataSource || isFetchingDataSource
                            }
                            rowKey={(record) => record?.id}
                            pagination={false}
                            bordered={true}
                            onChange={onChangeTable}
                        >
                            <Table.Column
                                title="Intern Name"
                                key="intern_name"
                                dataIndex="intern_name"
                                align="center"
                                sorter={true}
                                render={(_, record) => (
                                    <>
                                        {record.intern_name}
                                        <br />({record.school_id})
                                    </>
                                )}
                            />
                            <Table.Column
                                title="Status"
                                key="status"
                                dataIndex="status"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Select
                                        options={statusOptions}
                                        allowClear
                                        value={record?.status || ""}
                                        onChange={(value) => {
                                            handleStatusChange(
                                                record?.id,
                                                "status",
                                                value
                                            );
                                        }}
                                        onClear={() =>
                                            handleStatusChange(
                                                record?.id,
                                                "status",
                                                ""
                                            )
                                        }
                                        className={`status ${
                                            record?.status === "Applied"
                                                ? "applied"
                                                : ""
                                        } ${
                                            record?.status === "Accepted"
                                                ? "accepted"
                                                : ""
                                        } ${
                                            record?.status === "Started"
                                                ? "started"
                                                : ""
                                        } ${
                                            record?.status === "To Grade"
                                                ? "tograde"
                                                : ""
                                        } ${
                                            record?.status === "Completed"
                                                ? "completed"
                                                : ""
                                        }`}
                                    />
                                )}
                                filters={filterStatusOptions}
                                onFilter={(value, record) =>
                                    record.status === value
                                }
                            />
                            <Table.Column
                                title="Date Started"
                                key="date_started"
                                dataIndex="date_started"
                                align="center"
                                sorter={true}
                                width={120}
                            />
                            <Table.Column
                                title="Establishment"
                                key="office"
                                dataIndex="office"
                                align="center"
                                sorter={true}
                                width={130}
                            />
                            <Table.Column
                                title="Memorandum of Agreement"
                                key="moa"
                                dataIndex="moa"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={record?.moa_status || ""}
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "moa_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "moa_status",
                                                    ""
                                                )
                                            }
                                            className={`moa ${
                                                record?.moa_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.moa_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="moa_note"
                                            note={record?.moa_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.moa_status === value
                                }
                            />
                            <Table.Column
                                title="Letter to Parent"
                                key="ltp"
                                dataIndex="ltp"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={record?.ltp_status || ""}
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "ltp_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "ltp_status",
                                                    ""
                                                )
                                            }
                                            className={`ltp ${
                                                record?.ltp_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.ltp_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="ltp_note"
                                            note={record?.ltp_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.ltp_status === value
                                }
                            />
                            <Table.Column
                                title="Waiver from Parent"
                                key="wfp"
                                dataIndex="wfp"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={record?.wfp_status || ""}
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "wfp_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "wfp_status",
                                                    ""
                                                )
                                            }
                                            className={`wfp ${
                                                record?.wfp_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.wfp_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="wfp_note"
                                            note={record?.wfp_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.wfp_status === value
                                }
                            />
                            <Table.Column
                                title="Endorsement Letter"
                                key="endorsement"
                                dataIndex="endorsement"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={
                                                record?.endorsement_status || ""
                                            }
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "endorsement_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "endorsement_status",
                                                    ""
                                                )
                                            }
                                            className={`endorsement ${
                                                record?.endorsement_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.endorsement_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="endorsement_note"
                                            note={record?.endorsement_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.endorsement_status === value
                                }
                            />
                            <Table.Column
                                title="Daily Time Record"
                                key="dtr"
                                dataIndex="dtr"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={record?.dtr_status || ""}
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "dtr_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "dtr_status",
                                                    ""
                                                )
                                            }
                                            className={`dtr ${
                                                record?.dtr_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.dtr_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="dtr_note"
                                            note={record?.dtr_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.dtr_status === value
                                }
                            />
                            <Table.Column
                                title="Evaluation Form"
                                key="eval_form"
                                dataIndex="eval_form"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={
                                                record?.eval_form_status || ""
                                            }
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "eval_form_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "eval_form_status",
                                                    ""
                                                )
                                            }
                                            className={`eval_form ${
                                                record?.eval_form_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.eval_form_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="eval_form_note"
                                            note={record?.eval_form_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.eval_form_status === value
                                }
                            />
                            <Table.Column
                                title="Terminal Report"
                                key="term_rep"
                                dataIndex="term_rep"
                                align="center"
                                width={130}
                                render={(_, record) => (
                                    <Flex gap={4} align="center">
                                        <Select
                                            options={options}
                                            allowClear
                                            value={
                                                record?.term_rep_status || ""
                                            }
                                            onChange={(value) => {
                                                handleStatusChange(
                                                    record?.id,
                                                    "term_rep_status",
                                                    value
                                                );
                                            }}
                                            onClear={() =>
                                                handleStatusChange(
                                                    record?.id,
                                                    "term_rep_status",
                                                    ""
                                                )
                                            }
                                            className={`term_rep ${
                                                record?.term_rep_status ===
                                                "In Progress"
                                                    ? "inprogress"
                                                    : ""
                                            } ${
                                                record?.term_rep_status ===
                                                "Completed"
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        />
                                        <TableNotes
                                            id={record?.id}
                                            field="term_rep_note"
                                            note={record?.term_rep_note}
                                        />
                                    </Flex>
                                )}
                                filters={filterOptions}
                                onFilter={(value, record) =>
                                    record.term_rep_status === value
                                }
                            />
                        </Table>
                    </Col>

                    <Col xs={24} sm={24} md={24}>
                        <div className="tbl-bottom-filter">
                            <TableShowingEntries />
                            <TablePagination
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                                setPaginationTotal={dataSource?.data.total}
                                showLessItems={true}
                                showSizeChanger={false}
                                tblIdWrapper="tbl_wrapper"
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
