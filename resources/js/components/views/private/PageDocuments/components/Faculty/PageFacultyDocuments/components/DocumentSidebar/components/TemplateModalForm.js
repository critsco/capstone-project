import React from "react";
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
import FloatQuill from "../../../../../../../../../providers/FloatQuill";

export default function TemplateModalForm(props) {
    const { toggleTemplateModalForm, setToggleTemplateModalForm } = props;
    const [form] = Form.useForm();

    const {
        mutate: mutateDocumentTemplate,
        isLoading: isLoadingDocumentTemplate,
    } = POST(`api/document_template`, "document_template_list");

    const onFinish = (values) => {
        let data = {
            ...values,
            id: toggleTemplateModalForm.data?.id || "",
        };

        mutateDocumentTemplate(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Document Template",
                        description: res.message,
                    });
                    setToggleTemplateModalForm({
                        open: false,
                        data: null,
                    });
                } else {
                    notification.error({
                        message: "Document Template",
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
            title="Document Template Form"
            wrapClassName="template-form"
            open={toggleTemplateModalForm.open}
            width={850}
            centered
            onCancel={() =>
                setToggleTemplateModalForm({
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
                            setToggleTemplateModalForm({
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
                            loading={isLoadingDocumentTemplate}
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
