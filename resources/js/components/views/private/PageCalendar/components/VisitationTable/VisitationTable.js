import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Empty,
    Flex,
    notification,
    Popconfirm,
    Row,
    Table,
} from "antd";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxArchive,
    faFolderOpen,
    faPencil,
} from "@fortawesome/pro-regular-svg-icons";

export default function VisitationTable() {
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 10,
        search: "",
        sort_field: "date_time",
        sort_order: "asc",
    });

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prevState) => ({
            ...prevState,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "10",
            company_name: filters.company_name || "",
        }));
    };

    const handleArchive = (record) => {
        // mutateDeleteScholarshipDetail(record, {
        // 	onSuccess: (res) => {
        // 		// console.log("res", res);
        // 		if (res.success) {
        // 			notification.success({
        // 				message: "Scholarship",
        // 				description: res.message,
        // 			});
        // 		} else {
        // 			notification.error({
        // 				message: "Scholarship",
        // 				description: res.message,
        // 			});
        // 		}
        // 	},
        // 	onError: (err) => {
        // 		notificationErrors(err);
        // 	},
        // });
    };

    useEffect(() => {
        // refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
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
                                // dataSource={dataSource && dataSource.data.data}
                                // loading={
                                //     isLoadingDataSource || isFetchingDataSource
                                // }
                                rowKey={(record) => record.id}
                                pagination={false}
                                bordered={true}
                                onChange={onChangeTable}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            image={
                                                <FontAwesomeIcon
                                                    icon={faFolderOpen}
                                                    style={{ color: "#e7e7e7" }}
                                                />
                                            }
                                            description="No schedules found"
                                        />
                                    ),
                                }}
                            >
                                <Table.Column
                                    title="Actions"
                                    key="actions"
                                    align="center"
                                    width={50}
                                    render={(record) => {
                                        return (
                                            <Flex
                                                justify="center"
                                                className="action-buttons"
                                            >
                                                <Button
                                                    type="link"
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        setToggleModalForm({
                                                            open: true,
                                                            data: record,
                                                        })
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPencil}
                                                    />
                                                </Button>
                                                <Popconfirm
                                                    title="Are you sure to archive this data?"
                                                    onConfirm={() => {
                                                        handleArchive(record);
                                                    }}
                                                    onCancel={() => {
                                                        notification.error({
                                                            message: "Schedule",
                                                            description:
                                                                "Data not archived",
                                                        });
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        type="link"
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            setToggleModalForm({
                                                                open: true,
                                                                data: record,
                                                            })
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faBoxArchive}
                                                        />
                                                    </Button>
                                                </Popconfirm>
                                            </Flex>
                                        );
                                    }}
                                />
                                <Table.Column
                                    title="Intern Name"
                                    key="intern_name"
                                    dataIndex="intern_name"
                                    sorter={true}
                                    align="center"
                                    // filters={companyFilterOptions}
                                    // onFilter={(value, record) =>
                                    //     record.company_name === value
                                    // }
                                />
                                <Table.Column
                                    title="Student ID"
                                    key="student_id"
                                    dataIndex="student_id"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Practicum Instructor"
                                    key="instructor_name"
                                    dataIndex="instructor_name"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Company Name"
                                    key="company_name"
                                    dataIndex="company_name"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Company Head"
                                    key="company_head"
                                    dataIndex="company_head"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Date and Time"
                                    key="date_time"
                                    dataIndex="date_time"
                                    sorter={true}
                                    align="center"
                                />
                            </Table>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <div className="tbl-bottom-filter">
                                <TableShowingEntries />
                                <TablePagination
                                    tableFilter={tableFilter}
                                    setTableFilter={setTableFilter}
                                    // setPaginationTotal={dataSource?.data.total}
                                    showLessItems={true}
                                    showSizeChanger={false}
                                    tblIdWrapper="tbl_wrapper"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
