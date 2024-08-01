import React, { useState } from "react";

import {
    Button,
    Col,
    DatePicker,
    Flex,
    Input,
    Layout,
    Popover,
    Row,
    TimePicker,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import SchedulePurposeRadio from "./SchedulePurposeRadio";

export default function SetSchedule() {
    const [open, setOpen] = useState(false);
    const [purpose, setPurpose] = useState("visitation");
    const [internName, setInternName] = useState("");
    const [document, setDocument] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const content = (
        <Layout className="setschedule-popover">
            <Layout.Content>
                <Flex vertical gap={12}>
                    <Row>
                        <Col xs={24} sm={24} md={14} lg={14}>
                            <Flex vertical gap={4}>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "12",
                                    }}
                                >
                                    Purpose
                                </div>
                                <SchedulePurposeRadio setPurpose={setPurpose} />
                            </Flex>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Input
                                placeholder="Intern Name"
                                value={internName}
                                onChange={(e) => setInternName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    {purpose === "visitation" ? (
                        <></>
                    ) : (
                        <Row gutter={6}>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                <Input
                                    placeholder="Document"
                                    value={document}
                                    onChange={(e) =>
                                        setDocument(e.target.value)
                                    }
                                />
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                <Input
                                    placeholder="Note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row gutter={6}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Flex vertical gap={4}>
                                <div style={{ fontWeight: "bold" }}>
                                    Set Date
                                </div>
                                <DatePicker
                                    value={date}
                                    onChange={(date) => setDate(date)}
                                    style={{
                                        width: "100%",
                                        fontSize: "16px",
                                        marginBottom: "8px",
                                        boxShadow:
                                            "1px 2px 8px rgba(23, 26, 31, 0.12)",
                                    }}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Flex vertical gap={4}>
                                <div style={{ fontWeight: "bold" }}>
                                    Set Time
                                </div>
                                <TimePicker
                                    value={time}
                                    onChange={(time) => setTime(time)}
                                    use12Hours
                                    format="h:mm A"
                                    style={{
                                        width: "100%",
                                        fontSize: "16px",
                                        boxShadow:
                                            "1px 2px 8px rgba(23, 26, 31, 0.12)",
                                    }}
                                />
                            </Flex>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Flex
                                justify="end"
                                gap={6}
                                className="set-popover-buttons"
                            >
                                <Button onClick={hide}>Close</Button>
                                <Button className="set-btn">Set</Button>
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </Layout.Content>
        </Layout>
    );

    return (
        <Popover
            title={
                <Flex
                    align="center"
                    justify="space-between"
                    style={{
                        borderBottom: "1px solid #dee1e6",
                        paddingBottom: "8px",
                    }}
                >
                    <div style={{ fontSize: "16px" }}>Set Schedule</div>
                    <FontAwesomeIcon
                        onClick={hide}
                        icon={faXmark}
                        style={{ cursor: "pointer" }}
                    />
                </Flex>
            }
            content={content}
            placement="leftTop"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button
                style={{
                    background: "#2c3d8f",
                    color: "white",
                }}
            >
                Set
            </Button>
        </Popover>
    );
}
