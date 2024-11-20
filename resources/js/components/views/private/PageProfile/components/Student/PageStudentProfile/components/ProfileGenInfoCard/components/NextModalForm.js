import React, { useEffect, useState } from "react";
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
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhone } from "@fortawesome/pro-regular-svg-icons";

import { POST } from "../../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../../providers/notificationErrors";

export default function NextModalForm(props) {
    const {
        toggleModalForm,
        setToggleModalForm,
        formData,
        setFormData,
        dataProfile,
    } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const { mutate: mutateUpdateProfile, isLoading: isLoadingUpdateProfile } =
        POST(`api/update_student_profile`, "update_student_profile_list");

    useEffect(() => {
        if (toggleModalForm.nextOpen) {
            setLoading(true);

            form.setFieldsValue({
                p_first_name: dataProfile.profile_parent?.first_name,
                p_middle_name: dataProfile.profile_parent?.middle_name,
                p_last_name: dataProfile.profile_parent?.last_name,
                p_suffix: dataProfile.profile_parent?.suffix,
                relationship: dataProfile.profile_parent?.relationship,
                p_phone: dataProfile.profile_parent?.phone,
            });

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [toggleModalForm.nextOpen]);

    const onFinish = (values) => {
        let data = {
            ...formData,
            ...values,
        };

        console.log("onFinish", data);

        mutateUpdateProfile(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        editOpen: false,
                        nextOpen: false,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Update Profile",
                        description: res.message,
                    });
                    window.location.reload();
                } else {
                    notification.error({
                        message: "Update Profile",
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
                dataProfile?.parent_id
                    ? "Edit Parent Information"
                    : "Add Parent Information"
            }
            wrapClassName="signup-form"
            open={toggleModalForm.nextOpen}
            width={850}
            centered
            loading={loading}
            onCancel={() =>
                setToggleModalForm({
                    nextOpen: false,
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
                                editOpen: true,
                                nextOpen: false,
                                data: dataProfile,
                            })
                        }
                    >
                        Back
                    </Button>

                    <Popconfirm
                        key={2}
                        rootClassName="edit-confirm-btn"
                        title="Confirmation"
                        description="Are you sure you want to submit?"
                        onConfirm={() => form.submit()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="submit-btn"
                            loading={isLoadingUpdateProfile}
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
                <Flex gap={6} align="center" style={{ marginTop: "20px" }}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: "24px" }}
                    />
                    <div>Parent/Guardian Information</div>
                </Flex>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="First Name"
                            name="p_first_name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input parent/guardian's first name!",
                                },
                            ]}
                        >
                            <Input placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Middle Name"
                            name="p_middle_name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input parent/guardian's middle name!",
                                },
                            ]}
                        >
                            <Input placeholder="Middle name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Last Name"
                            name="p_last_name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input parent/guardian's last name!",
                                },
                            ]}
                        >
                            <Input placeholder="Last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={3}>
                        <Form.Item label="Suffix" name="p_suffix">
                            <Input placeholder="Suffix" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Relationship"
                            name="relationship"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your relationship!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Relationship"
                                options={[
                                    { value: "Parent", label: "Parent" },
                                    {
                                        value: "Grandparent",
                                        label: "Grandparent",
                                    },
                                    { value: "Sibling", label: "Sibling" },
                                    { value: "Relative", label: "Relative" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Phone"
                            name="p_phone"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input parent/guardian's phone number!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="+63"
                                addonBefore={
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        style={{ color: "#bdc1ca" }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
