import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../../providers/CustomTableFilter";
import ModalView from "./components/ModalView";

export default function ApprovedListTable() {
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

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(
        `api/companies?${new URLSearchParams(tableFilter)}`,
        "companies_list"
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
                            >
                                <Table.Column
                                    title="Preview"
                                    key="preview"
                                    align="center"
                                    width={50}
                                    render={(record) => {
                                        return (
                                            <div className="action-buttons">
                                                <Button
                                                    className="preview"
                                                    onClick={() => {
                                                        setToggleModalForm({
                                                            open: true,
                                                            data: record,
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </Button>
                                            </div>
                                        );
                                    }}
                                />
                                <Table.Column
                                    title="Company"
                                    key="company_name"
                                    dataIndex="company_name"
                                    sorter={true}
                                    align="center"
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
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </>
    );
}
