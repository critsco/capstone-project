import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button, Empty, Flex, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxArchive,
    faEye,
    faFolderOpen,
    faPencil,
} from "@fortawesome/pro-regular-svg-icons";

import { DELETE, GET } from "../../../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../../providers/CustomTableFilter";
import ModalView from "./components/ModalView";
import ModalForm from "./components/ModalForm";

export default function ApprovedListTable() {
    const [toggleModalView, setToggleModalView] = useState({
        open: false,
        data: null,
    });
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        data: null,
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 10,
        search: "",
        sort_field: "company_name",
        sort_order: "asc",
    });

    const [companyFilterOptions, setCompanyFilterOptions] = useState([]);

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(
        `api/companies?${new URLSearchParams(tableFilter)}`,
        "companies_list"
    );

    const { data: uniqueCompanies } = GET(
        `api/unique_companies`,
        "unique_companies_list"
    );

    const { mutate: mutateDeleteCompany, isLoading: isLoadingDeleteCompany } =
        DELETE(`api/companies`, "companies_list");

    useEffect(() => {
        // Generate unique company names for the filter options
        if (uniqueCompanies?.data) {
            const companyNames = uniqueCompanies.data.map((company) => ({
                text: company.company_name,
                value: company.company_name,
            }));
            setCompanyFilterOptions(companyNames);
        }
    }, [uniqueCompanies]);

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
        mutateDeleteCompany(record, {
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
                                            description="No approved companies found"
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
                                            <Flex className="action-buttons">
                                                <Button
                                                    className="preview-btn"
                                                    onClick={() => {
                                                        setToggleModalView({
                                                            open: true,
                                                            data: record,
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </Button>
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
                                                            message:
                                                                "Scholarship",
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
                                                            isLoadingDeleteCompany
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
                                    title="Company"
                                    key="company_name"
                                    dataIndex="company_name"
                                    sorter={true}
                                    align="center"
                                    filters={companyFilterOptions}
                                    onFilter={(value, record) =>
                                        record.company_name === value
                                    }
                                />
                                <Table.Column
                                    title="Office"
                                    key="office"
                                    dataIndex="office"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Office Head"
                                    key="office_head"
                                    dataIndex="office_head"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Email"
                                    key="email"
                                    dataIndex="email"
                                    sorter={true}
                                    align="center"
                                />
                                <Table.Column
                                    title="Address"
                                    key="address"
                                    dataIndex="address"
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

            <ModalView
                toggleModalView={toggleModalView}
                setToggleModalView={setToggleModalView}
            />
            <ModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </>
    );
}
