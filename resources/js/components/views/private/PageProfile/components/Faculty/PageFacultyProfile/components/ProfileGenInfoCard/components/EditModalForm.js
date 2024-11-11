import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhone } from "@fortawesome/pro-regular-svg-icons";
import dayjs from "dayjs";

import { GET } from "../../../../../../../../../providers/useAxiosQuery";

export default function EditModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const { data: dataDepartment } = GET(
        `api/pub_department_dropdown`,
        "department_dropdown"
    );

    useEffect(() => {
        if (toggleModalForm.open) {
            setLoading(true);

            form.setFieldsValue({
                ...toggleModalForm.data,
                department_id: toggleModalForm.data?.department_id,
            });

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalForm.open]);

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            id: toggleModalForm.data.id,
        };

        mutateFacultyRegister(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Update Profile",
                        description: res.message,
                    });
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
            title="Edit Information"
            wrapClassName="signup-form"
            open={toggleModalForm.open}
            width={850}
            centered
            loading={loading}
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
                    <Button
                        key={2}
                        className="submit-btn"
                        onClick={() => form.submit()}
                    >
                        Next
                    </Button>
                </Flex>
            }
        >
            <Form form={form} layout="vertical" autoComplete="off">
                <Flex gap={6} align="center">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: "24px" }}
                    />
                    <div>Practicum Instructor Information</div>
                </Flex>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="First Name" name="first_name">
                            <Input required={true} placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="Middle Name" name="middle_name">
                            <Input required={true} placeholder="Middle name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="Last Name" name="last_name">
                            <Input required={true} placeholder="Last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={3}>
                        <Form.Item label="Suffix" name="suffix">
                            <Input required={true} placeholder="Suffix" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="Faculty ID" name="school_id">
                            <Input required={true} placeholder="Faculty ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="University Email" name="email">
                            <Input
                                required={true}
                                placeholder="@urios.edu.ph"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item label="Department" name="department_id">
                            <Select
                                required={true}
                                placeholder="Department"
                                options={
                                    dataDepartment && dataDepartment.data
                                        ? dataDepartment.data.map((item) => ({
                                              value: item.id,
                                              label: item.department,
                                          }))
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="Phone" name="phone">
                            <Input
                                required={true}
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
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item label="Gender" name="gender">
                            <Select
                                required={true}
                                placeholder="Gender"
                                options={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                    { value: "Other", label: "Others" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
