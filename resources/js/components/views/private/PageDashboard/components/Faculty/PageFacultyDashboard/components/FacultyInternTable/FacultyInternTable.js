import React, { useState } from "react";
import { Flex, Select, Table } from "antd";
import TableDropdown from "./components/TableDropdown/TableDropdown";

const statusOptions = [
    { value: "tograde", label: "To Grade" },
    { value: "applied", label: "Applied" },
    { value: "accepted", label: "Accepted" },
    { value: "started", label: "Started" },
];
const options = [
    { value: "inprogress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

export default function FacultyInternTable() {
    const [selectedStatusValue, setSelectedStatusValue] = useState();
    const [selectedMoaValue, setSelectedMoaValue] = useState();
    const [selectedLetterParentValue, setSelectedLetterParentValue] =
        useState();
    const [selectedWaiverParentValue, setSelectedWaiverParentValue] =
        useState();
    const [selectedWaiverSchoolValue, setSelectedWaiverSchoolValue] =
        useState();
    const [selectedEndorsementValue, setSelectedEndorsementValue] = useState();
    const [selectedDTRValue, setSelectedDTRValue] = useState();
    const [selectedEvaluationValue, setSelectedEvaluationValue] = useState();
    const [selectedTerminalReportValue, setSelectedTerminalReportValue] =
        useState();
    const handleStatusChange = (value) => {
        setSelectedStatusValue(value);
    };
    const handleMoaChange = (value) => {
        setSelectedMoaValue(value);
    };
    const handleLetterParentChange = (value) => {
        setSelectedLetterParentValue(value);
    };
    const handleWaiverParentChange = (value) => {
        setSelectedWaiverParentValue(value);
    };
    const handleWaiverSchoolChange = (value) => {
        setSelectedWaiverSchoolValue(value);
    };
    const handleEndorsementChange = (value) => {
        setSelectedEndorsementValue(value);
    };
    const handleDTRChange = (value) => {
        setSelectedDTRValue(value);
    };
    const handleEvaluationChange = (value) => {
        setSelectedEvaluationValue(value);
    };
    const handleTerminalReportChange = (value) => {
        setSelectedTerminalReportValue(value);
    };
    const data = [
        {
            key: "1",
            name: "Oliver Wendell Ceniza",
            status: "Started",
            datestarted: "April 1, 2024",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "salamat",
            letterparent: "Completed",
            letterparentnote: "huh?",
        },
        {
            key: "2",
            name: "Jona Mae Gitalada",
            status: "Started",
            datestarted: "April 1, 2024",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "no",
            letterparent: "Completed",
            letterparentnote: "hmm",
        },
        {
            key: "3",
            name: "Jezreel Pulido",
            status: "Accepted",
            datestarted: "",
            establishment: "DTI",
            moa: "Completed",
            moanote: "huh?",
            letterparent: "Completed",
            letterparentnote: "mao?",
        },
        {
            key: "4",
            name: "Jasmine Acido",
            status: "Applied",
            datestarted: "",
            establishment: "FSUU DSAC",
            moa: "Completed",
            moanote: "huh?",
            letterparent: "Completed",
            letterparentnote: "secret",
        },
        {
            key: "5",
            name: "Christian John Ibe",
            status: "Applied",
            datestarted: "",
            establishment: "FSUU FOUNDATION",
            moa: "Completed",
            moanote: "naol",
            letterparent: "Completed",
            letterparentnote: "yes",
        },
    ];
    const columns = [
        {
            title: "Intern Name",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: "175px",
            sorter: (a, b) => a.name.localeCompare(b.name),
            fixed: "left",
        },
        {
            title: "Status",
            key: "status",
            align: "center",
            width: "118px",
            render: (_, record) => (
                <Select
                    value={record.status}
                    onChange={handleStatusChange}
                    allowClear
                    className={`status ${
                        record.status === "Applied" ? "applied" : ""
                    } ${record.status === "Accepted" ? "accepted" : ""} ${
                        record.status === "Started" ? "started" : ""
                    }`}
                    options={statusOptions}
                />
            ),
            sorter: (a, b) => a.status.localeCompare(b.status),
            filters: [
                {
                    text: "Started",
                    value: "Started",
                },
                {
                    text: "Accepted",
                    value: "Accepted",
                },
                {
                    text: "Applied",
                    value: "Applied",
                },
                {
                    text: "No Progress",
                    value: "No Progress",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: "Date Started",
            dataIndex: "datestarted",
            key: "datestarted",
            align: "center",
            width: "100px",
        },
        {
            title: "Establishment",
            dataIndex: "establishment",
            key: "establishment",
            align: "center",
            width: "130px",
        },
        {
            title: "Memorandum of Agreement",
            dataIndex: "moa",
            key: "moa",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.moa}
                        onChange={handleMoaChange}
                        allowClear
                        className={`moa ${
                            record.moa === "In Progress" ? "inprogress" : ""
                        } ${record.moa === "Completed" ? "completed" : ""}`}
                        options={options}
                    />
                    <TableDropdown record={record} note={record.moanote} />
                </Flex>
            ),
        },
        {
            title: "Letter to Parent",
            dataIndex: "letterparent",
            key: "letterparent",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.letterparent}
                        onChange={handleLetterParentChange}
                        allowClear
                        className={`letterparent ${
                            record.letterparent === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.letterparent === "Completed"
                                ? "completed"
                                : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown
                        record={record}
                        note={record.letterparentnote}
                    />
                </Flex>
            ),
        },
        {
            title: "Waiver from Parent",
            dataIndex: "waiverparent",
            key: "waiverparent",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.waiverparent}
                        onChange={handleWaiverParentChange}
                        allowClear
                        className={`waiverparent ${
                            record.waiverparent === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.waiverparent === "Completed"
                                ? "completed"
                                : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
        {
            title: "Waiver from School",
            dataIndex: "waiverschool",
            key: "waiverschool",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.waiverschool}
                        onChange={handleWaiverSchoolChange}
                        allowClear
                        className={`waiverschool ${
                            record.waiverschool === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.waiverschool === "Completed"
                                ? "completed"
                                : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
        {
            title: "Endorsement Letter",
            dataIndex: "endorsementletter",
            key: "endorsementletter",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.endorsementletter}
                        onChange={handleEndorsementChange}
                        allowClear
                        className={`endorsementletter ${
                            record.endorsementletter === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.endorsementletter === "Completed"
                                ? "completed"
                                : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
        {
            title: "Daily Time Record",
            dataIndex: "dtr",
            key: "dtr",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.dtr}
                        onChange={handleDTRChange}
                        allowClear
                        className={`dtr ${
                            record.dtr === "In Progress" ? "inprogress" : ""
                        } ${record.dtr === "Completed" ? "completed" : ""}`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
        {
            title: "Evaluation Form",
            dataIndex: "evaluation",
            key: "evaluation",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.evaluation}
                        onChange={handleEvaluationChange}
                        allowClear
                        className={`evaluation ${
                            record.evaluation === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.evaluation === "Completed" ? "completed" : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
        {
            title: "Terminal Report",
            dataIndex: "terminalreport",
            key: "terminalreport",
            align: "center",
            width: "150px",
            render: (_, record) => (
                <Flex gap={4} align="center">
                    <Select
                        value={record.terminalreport}
                        onChange={handleTerminalReportChange}
                        allowClear
                        className={`terminalreport ${
                            record.terminalreport === "In Progress"
                                ? "inprogress"
                                : ""
                        } ${
                            record.terminalreport === "Completed"
                                ? "completed"
                                : ""
                        }`}
                        options={options}
                    />
                    <TableDropdown />
                </Flex>
            ),
        },
    ];

    return (
        <Table
            id="faculty_dashboard_intern_table"
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered={true}
            scroll={{
                x: 1800,
            }}
        />
    );
}