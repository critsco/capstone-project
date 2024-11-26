import React from "react";
import { Button, Col, Flex, Form, Modal, Popconfirm, Row } from "antd";

import FloatInput from "../../../../../../../../../providers/FloatInput";
import FloatQuill from "../../../../../../../../../providers/FloatQuill";

export default function ModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    return (
        <Modal
            title="Document Template Form"
            wrapClassName="template-form"
            open={toggleModalForm.open}
            width={750}
            centered
            onCancel={() =>
                setToggleModalForm({
                    open: false,
                    data: null,
                })
            }
            footer={
                <Flex gap={4} justify="end">
                    <Button
                        key={1}
                        className="cancel-btn"
                        onClick={() =>
                            setToggleModalForm({
                                open: false,
                                data: null,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Popconfirm
                        key={2}
                        rootClassName="confirm-btn"
                        title="Confirmation"
                        description="Are you sure you want to submit?"
                        onConfirm={() => form.submit()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="submit-btn">Submit</Button>
                    </Popconfirm>
                </Flex>
            }
        >
            <Form form={form} layout="vertical" autoComplete="off">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a title!",
                                },
                            ]}
                        >
                            <FloatInput label="Title" placeholder="Title" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input content!",
                                },
                            ]}
                        >
                            <FloatQuill label="Content" placeholder="Content" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
