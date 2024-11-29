import React from "react";
import { Button, Col, Flex, Form, Modal, Popconfirm, Row } from "antd";

import FloatInput from "../../../../../../../../../providers/FloatInput";
import FloatSelect from "../../../../../../../../../providers/FloatSelect";
import { GET } from "../../../../../../../../../providers/useAxiosQuery";

export default function VariableModalForm(props) {
    const { toggleVariableModalForm, setToggleVariableModalForm } = props;
    const [form] = Form.useForm();

    const { data: dataAllFields } = GET(
        `api/show_all_fields`,
        "all_fields_list"
    );

    console.log("allFields: ", dataAllFields);

    return (
        <Modal
            title="Document Variable Form"
            wrapClassName="template-form"
            open={toggleVariableModalForm.open}
            width={850}
            centered
            onCancel={() =>
                setToggleVariableModalForm({
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
                            setToggleVariableModalForm({
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
                <Row gutter={[8, 0]}>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <Form.Item
                            name="reference"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select where the variable is referencing.",
                                },
                            ]}
                        >
                            <FloatSelect
                                label="Reference"
                                placeholder="Reference"
                                options={[
                                    { label: "Faculty", value: "faculty" },
                                    { label: "Student", value: "student" },
                                    { label: "Company", value: "company" },
                                    { label: "Parent", value: "parent" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <Form.Item
                            name="field_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a field!",
                                },
                            ]}
                        >
                            <FloatSelect
                                label="Field"
                                placeholder="Field"
                                options={[]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <Form.Item
                            name="variable_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a variable name!",
                                },
                            ]}
                        >
                            <FloatInput label="Title" placeholder="Title" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
