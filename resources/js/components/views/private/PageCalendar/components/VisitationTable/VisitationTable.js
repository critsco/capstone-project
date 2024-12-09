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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxArchive,
    faFolderOpen,
    faPencil,
} from "@fortawesome/pro-regular-svg-icons";

import { DELETE, GET } from "../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../providers/notificationErrors";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../../providers/CustomTableFilter";

export default function VisitationTable(props) {
    const { setToggleModalForm } = props;
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 10,
        search: "",
        sort_field: "date",
        sort_order: "asc",
        purpose: "Visitation",
    });

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(
        `api/schedules?${new URLSearchParams(tableFilter)}`,
        "schedules_list"
    );

    const { mutate: mutateDeleteSchedule, isLoading: isLoadingDeleteSchedule } =
        DELETE(`api/schedules`, "schedules_list");

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prevState) => ({
            ...prevState,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "10",
        }));
    };

    const handleArchive = (record) => {
        console.log("record: ", record);

        mutateDeleteSchedule(record, {
            onSuccess: (res) => {
                // console.log("res", res);
                if (res.success) {
                    notification.success({
                        message: "Scholarship",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Scholarship",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        refetchSource();

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
                                dataSource={dataSource && dataSource.data.data}
                                loading={
                                    isLoadingDataSource || isFetchingDataSource
                                }
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
                                                        className="archive-btn"
                                                        loading={
                                                            isLoadingDeleteSchedule
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
                                    key="school_id"
                                    dataIndex="school_id"
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
                                    key="office_head"
                                    dataIndex="office_head"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Date"
                                    key="date"
                                    dataIndex="date"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Time"
                                    key="time"
                                    dataIndex="time"
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
        </>
    );
}
