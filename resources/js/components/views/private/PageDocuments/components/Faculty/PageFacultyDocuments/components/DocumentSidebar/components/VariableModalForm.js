import React, { useState } from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Modal,
    notification,
    Popconfirm,
    Row,
} from "antd";

import { POST } from "../../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../../providers/notificationErrors";
import FloatInput from "../../../../../../../../../providers/FloatInput";
import FloatSelect from "../../../../../../../../../providers/FloatSelect";
import fieldNameList from "./components/fieldNameList";

export default function VariableModalForm(props) {
    const { toggleVariableModalForm, setToggleVariableModalForm } = props;
    const [form] = Form.useForm();

    const {
        mutate: mutateDocumentVariable,
        isLoading: isLoadingDocumentVariable,
    } = POST(`api/document_variables`, "document_variables_list");

    const onFinish = (values) => {
        let data = {
            ...values,
            id: toggleVariableModalForm.data?.id || "",
        };

        mutateDocumentVariable(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Document Variable",
                        description: res.message,
                    });
                    setToggleVariableModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                } else {
                    notification.error({
                        message: "Document Variable",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <Modal
            title="Document Variable Form"
            wrapClassName="template-form"
            open={toggleVariableModalForm.open}
            width={550}
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
                        <Button
                            className="submit-btn"
                            loading={isLoadingDocumentVariable}
                        >
                            Submit
                        </Button>
                    </Popconfirm>
                </Flex>
            }
        >
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Row gutter={[8, 0]}>
                    <Col xs={12} sm={12} md={12} lg={12}>
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
                                label="Field Name"
                                placeholder="Field Name"
                                options={fieldNameList}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Form.Item
                            name="variable_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a variable name!",
                                },
                            ]}
                        >
                            <FloatInput
                                label="Variable Name"
                                placeholder="Variable Name"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
