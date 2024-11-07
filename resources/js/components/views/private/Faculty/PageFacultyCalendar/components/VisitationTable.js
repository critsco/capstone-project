import React from "react";

import { Flex, Popconfirm, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { faTrashXmark } from "@fortawesome/pro-regular-svg-icons";

export default function VisitationTable() {
    const data = [
        {
            key: "1",
            name: "Juan Martin",
            student_id: "21100001090",
            practicum_instructor: "Rejeenald Miras Flores",
            company_name: "Flukeeper",
            company_head: "Emily Brown",
            date: "April 21, 2024",
            time: "10:00 AM",
        },
        {
            key: "2",
            name: "John Davis",
            student_id: "21100001001",
            practicum_instructor: "Rejeenald Miras Flores",
            company_name: "SpaceX",
            company_head: "Elon Musk",
            date: "April 21, 2024",
            time: "10:30 AM",
        },
        {
            key: "3",
            name: "Sarah Jackson",
            student_id: "21100001000",
            practicum_instructor: "Rejeenald Miras Flores",
            company_name: "CyberXel Tech",
            company_head: "Marta Diaz",
            date: "April 21, 2024",
            time: "1:00 PM",
        },
        {
            key: "4",
            name: "Ryan Young",
            student_id: "21100001054",
            practicum_instructor: "Rejeenald Miras Flores",
            company_name: "PluRush",
            company_head: "Pedro Moreno",
            date: "April 22, 2024",
            time: "1:00 PM",
        },
        {
            key: "5",
            name: "Nathan Martin",
            student_id: "21100001043",
            practicum_instructor: "Rejeenald Miras Flores",
            company_name: "GearVue",
            company_head: "Brooklyn Wilson",
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
            render: (_, record) => (
                <Flex gap={8} justify="center">
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ cursor: "pointer" }}
                    />
                    <Popconfirm
                        title="Do wish to delete this record?"
                        onConfirm={() => handleDelete(record.key)}
                    >
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
            title: "Practicum Instructor",
            dataIndex: "practicum_instructor",
            key: "practicum_instructor",
            align: "center",
        },
        {
            title: "Company Name",
            dataIndex: "company_name",
            key: "company_name",
            align: "center",
        },
        {
            title: "Company Head",
            dataIndex: "company_head",
            key: "company_head",
            align: "center",
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
