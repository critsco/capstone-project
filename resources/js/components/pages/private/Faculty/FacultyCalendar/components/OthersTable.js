import React from "react";

import { Flex, Popconfirm, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrashXmark,
} from "@fortawesome/pro-regular-svg-icons";

export default function OthersTable() {
    const data = [
        {
            key: "1",
            name: "Juan Martin",
            student_id: "21100001090",
            documents: "Endorsement Letter",
            notes: "For signature.",
            date: "April 1, 2024",
            time: "10:00 AM",
        },
        {
            key: "2",
            name: "Sarah Jackson",
            student_id: "21100001000",
            documents: "Endorsement Letter",
            notes: "For signature.",
            date: "April 21, 2024",
            time: "10:30 AM",
        },
        {
            key: "3",
            name: "Ryan Young",
            student_id: "21100001054",
            documents: "Endorsement Letter",
            notes: "For signature.",
            date: "April 21, 2024",
            time: "1:00 PM",
        },
        {
            key: "4",
            name: "Nathan Martin",
            student_id: "21100001043",
            documents: "Endorsement Letter",
            notes: "For pickup.",
            date: "April 22, 2024",
            time: "1:00 PM",
        },
        {
            key: "5",
            name: "Ashley Watson",
            student_id: "21100001033",
            documents: "Memorandum of Agreement",
            notes: "For pickup",
            date: "April 23, 2024",
            time: "10:00 AM",
        },
    ];

    const columns = [
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            align: "center",
            width: "140px",
            render: () => (
                <Flex gap={8} justify="center">
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ cursor: "pointer" }}
                    />
                    <Popconfirm>
                        <FontAwesomeIcon
                            icon={faTrashXmark}
                            color="#c12126"
                            style={{ cursor: "pointer" }}
                        />
                    </Popconfirm>
                </Flex>
            ),
        },
        {
            title: "Intern Name",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: "235px",
        },
        {
            title: "Student ID",
            dataIndex: "student_id",
            key: "student_id",
            align: "center",
            width: "150px",
        },
        {
            title: "Documents",
            dataIndex: "documents",
            key: "documents",
            align: "center",
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
            align: "center",
            width: "402px",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            width: "150px",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            align: "center",
            width: "150px",
        },
    ];

    return (
        <div id="faculty_schedule_table">
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered={true}
            />
        </div>
    );
}
