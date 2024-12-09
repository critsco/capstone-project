import React from "react";
import { Col, Row, Table } from "antd";

import { GET } from "../../../../../../../../../../providers/useAxiosQuery";

export default function StatusTable(props) {
    const { dataProfile } = props;

    // console.log("dataProfile: ", dataProfile);

    const { data: dataSource, isLoading: isLoadingDataSource } = GET(
        `api/ojt_details/${dataProfile.data.id}`,
        "ojt_details_list"
    );

    console.log("dataSource: ", dataSource);

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
            dataIndex: "start_date",
            key: "start_date",
            align: "center",
            width: 100,
        },
        {
            title: "Last Update",
            dataIndex: "update_date",
            key: "update_date",
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

    const data = [
        {
            key: "1",
            document: "Memorandum of Agreement",
            status: dataSource ? dataSource.data?.moa_status : "",
            start_date: dataSource ? dataSource.data?.moa_start_date : "",
            update_date: dataSource ? dataSource.data?.moa_update_date : "",
            note: dataSource ? dataSource.data?.moa_note : "",
        },
        {
            key: "2",
            document: "Letter to Parent",
            status: dataSource ? dataSource.data?.ltp_status : "",
            start_date: dataSource ? dataSource.data?.ltp_start_date : "",
            update_date: dataSource ? dataSource.data?.ltp_update_date : "",
            note: dataSource ? dataSource.data?.ltp_note : "",
        },
        {
            key: "3",
            document: "Waiver from Parent",
            status: dataSource ? dataSource.data?.wfp_status : "",
            start_date: dataSource ? dataSource.data?.wfp_start_date : "",
            update_date: dataSource ? dataSource.data?.wfp_update_date : "",
            note: dataSource ? dataSource.data?.wfp_note : "",
        },
        {
            key: "4",
            document: "Daily Time Record",
            status: dataSource ? dataSource.data?.dtr_status : "",
            start_date: dataSource ? dataSource.data?.dtr_start_date : "",
            update_date: dataSource ? dataSource.data?.dtr_update_date : "",
            note: dataSource ? dataSource.data?.dtr_note : "",
        },
        {
            key: "5",
            document: "Evaluation Form",
            status: dataSource ? dataSource.data?.eval_form_status : "",
            start_date: dataSource ? dataSource.data?.eval_form_start_date : "",
            update_date: dataSource
                ? dataSource.data?.eval_form_update_date
                : "",
            note: dataSource ? dataSource.data?.eval_form_note : "",
        },
        {
            key: "6",
            document: "Terminal Report",
            status: dataSource ? dataSource.data?.term_rep_status : "",
            start_date: dataSource ? dataSource.data?.term_rep_start_date : "",
            update_date: dataSource
                ? dataSource.data?.term_rep_update_date
                : "",
            note: dataSource ? dataSource.data?.term_rep_note : "",
        },
    ];

    return (
        <Row id="tbl_wrapper">
            <Col xs={24} sm={24} md={24} lg={24}>
                <Table
                    dataSource={data}
                    columns={columns}
                    bordered
                    loading={isLoadingDataSource}
                    pagination={false}
                    size="small"
                />
            </Col>
        </Row>
    );
}
