import React, { useState } from "react";
import { Col, Row, Table } from "antd";

import { GET } from "../../../../../../../../providers/useAxiosQuery";

export default function FacultyScheduleTable() {
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 4,
        search: "",
        sort_field: "date",
        sort_order: "asc",
    });

    const { data: dataSource, isLoading: isLoadingDataSource } = GET(
        `api/schedules?${new URLSearchParams(tableFilter)}`,
        "schedules_list"
    );

    console.log("dataSource: ", dataSource?.data?.data);

    return (
        <>
            <Row id="tbl-wrapper">
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Table
                        dataSource={dataSource && dataSource.data.data}
                        loading={isLoadingDataSource}
                        rowKey={(record) => record.id}
                        pagination={false}
                        bordered={true}
                    >
                        <Table.Column
                            title="Name"
                            key="intern_name"
                            dataIndex="intern_name"
                            width={225}
                            align="center"
                        />
                        <Table.Column
                            title="Date"
                            key="date"
                            dataIndex="date"
                            align="center"
                        />
                        <Table.Column
                            title="Time"
                            key="time"
                            dataIndex="time"
                            align="center"
                        />
                        <Table.Column
                            title="Reason"
                            key="note"
                            dataIndex="note"
                            width={120}
                            align="center"
                        />
                    </Table>
                </Col>
            </Row>
        </>
    );
}
