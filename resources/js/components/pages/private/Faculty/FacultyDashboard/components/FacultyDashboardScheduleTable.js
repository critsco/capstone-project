import React from "react";

import { Table } from "antd";

export default function FacultyScheduleTable() {
    const data = [
        {
            key: "1",
            name: "Oliver Wendell Ceniza",
            date: "April 1, 2024",
            time: "1:00 PM",
            reason: "Visitation",
        },
        {
            key: "2",
            name: "Jona Mae Gitalada",
            date: "April 1, 2024",
            time: "2:00 PM",
            reason: "Visitation",
        },
        {
            key: "3",
            name: "Jezreel Pulido",
            date: "April 1, 2024",
            time: "3:00 PM",
            reason: "Visitation",
        },
        {
            key: "4",
            name: "Jasmine Acido",
            date: "April 1, 2024",
            time: "4:00 PM",
            reason: "Signature",
        },
        {
            key: "5",
            name: "Christian John Ibe",
            date: "April 2, 2024",
            time: "1:00 PM",
            reason: "Signature",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            align: "center",
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
        },
    ];

    return (
        <Table
            id="faculty-dashboard-schedule-table"
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered={true}
            // style={{ height: "315px" }}
        />
    );
}
