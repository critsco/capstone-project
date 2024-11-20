import React from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    notification,
    Popconfirm,
    Row,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { POST } from "../../../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../../../providers/notificationErrors";

export default function AddClassModalForm(props) {
    const { toggleAddModalForm, setToggleAddModalForm } = props;
    const [form] = Form.useForm();

    const { mutate: mutateInternClass, isLoading: isLoadingInternClass } = POST(
        `api/intern_classes`,
        "intern_classes_list"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            instructor_id: toggleAddModalForm.data.id,
        };

        mutateInternClass(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleAddModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Create Class",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Create Class",
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
            title={
                <Flex align="center" gap={8}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{
                            background: "#DEE1E6",
                            color: "#2c3d8f",
                            fontSize: "20px",
                            padding: "8px",
                            borderRadius: "50%",
                        }}
                    />
                    Create Class
                </Flex>
            }
            wrapClassName="add-class-form"
            open={toggleAddModalForm.open}
            width={500}
            centered
            onCancel={() =>
                setToggleAddModalForm({
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
                            setToggleAddModalForm({
                                open: false,
                                data: null,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Popconfirm
                        key={2}
                        rootClassName="add-confirm-btn"
                        title="Confirmation"
                        description="Are you sure you want to submit?"
                        onConfirm={() => form.submit()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="submit-btn"
                            loading={isLoadingInternClass}
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
                        <Flex vertical>
                            <Form.Item
                                label="Class Code"
                                name="class_code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the class code!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter a class code" />
                            </Form.Item>
                            <div className="info-header">
                                Enter a class code with the format CourseYear.
                                (Ex. BSIT24)
                            </div>
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
