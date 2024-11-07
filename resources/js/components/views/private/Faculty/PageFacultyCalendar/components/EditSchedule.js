import React, { useEffect, useState } from "react";

import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Layout,
    Popover,
    Row,
    TimePicker,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import SchedulePurposeRadio from "./SchedulePurposeRadio";

export default function EditSchedule({
    selectedRowKeys,
    selectedRows,
    onRowUpdate,
}) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [purpose, setPurpose] = useState("visitation");

    useEffect(() => {
        if (selectedRows.length === 1) {
            form.setFieldsValue(selectedRows[0]);
        }
    }, [selectedRows, form]);

    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleSave = () => {
        form.validateFields().then((values) => {
            onRowUpdate({ ...selectedRows[0], ...values });
            hide();
        });
    };

    const content = (
        <Layout className="schedule-popover">
            <Layout.Content>
                <Form form={form} layout="vertical">
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
                                    <Form.Item name="purpose" noStyle>
                                        <SchedulePurposeRadio
                                            setPurpose={(purpose) =>
                                                form.setFieldsValue({ purpose })
                                            }
                                        />
                                    </Form.Item>
                                </Flex>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <Form.Item name="internName">
                                    <Input placeholder="Intern Name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {purpose === "visitation" ? (
                            <></>
                        ) : (
                            <Row gutter={6}>
                                <Col xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item name="document">
                                        <Input placeholder="Document" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item name="note">
                                        <Input placeholder="Note" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                        <Row gutter={6}>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                <Flex vertical gap={4}>
                                    <div style={{ fontWeight: "bold" }}>
                                        Set Date
                                    </div>
                                    <Form.Item name="date">
                                        <DatePicker
                                            style={{
                                                width: "100%",
                                                fontSize: "16px",
                                                marginBottom: "8px",
                                                boxShadow:
                                                    "1px 2px 8px rgba(23, 26, 31, 0.12)",
                                            }}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                <Flex vertical gap={4}>
                                    <div style={{ fontWeight: "bold" }}>
                                        Set Time
                                    </div>
                                    <Form.Item name="time">
                                        <TimePicker
                                            use12Hours
                                            format="h:mm A"
                                            style={{
                                                width: "100%",
                                                fontSize: "16px",
                                                boxShadow:
                                                    "1px 2px 8px rgba(23, 26, 31, 0.12)",
                                            }}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <Flex
                                    justify="end"
                                    gap={6}
                                    className="popover-buttons"
                                >
                                    <Button onClick={hide}>Close</Button>
                                    <Button
                                        className="save-btn"
                                        onClick={handleSave}
                                    >
                                        Set
                                    </Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Flex>
                </Form>
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
                    <div style={{ fontSize: "16px" }}>Edit Schedule</div>
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
                    background: "#9095A1",
                    color: "white",
                }}
                disabled={selectedRowKeys.length !== 1}
            >
                Edit
            </Button>
        </Popover>
    );
}
