import React from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhone } from "@fortawesome/pro-regular-svg-icons";

import { GET, POST } from "../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../providers/notificationErrors";

export default function SignupModal(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    const { data: dataDepartment } = GET(
        `api/pub_department_dropdown`,
        "department_dropdown"
    );

    const {
        mutate: mutateFacultyRegister,
        isLoading: isLoadingFacultyRegister,
    } = POST(`api/register`, "register_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            user_role_id: 1,
        };

        mutateFacultyRegister(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Registration",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Registration",
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
            title="Create an AutoForm Account"
            wrapClassName="signup-form"
            open={toggleModalForm.open}
            width={850}
            style={{ marginTop: "-100px" }}
            centered
            onCancel={() =>
                setToggleModalForm({
                    open: false,
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
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        key={2}
                        className="submit-btn"
                        onClick={() => form.submit()}
                        loading={isLoadingFacultyRegister}
                    >
                        Submit
                    </Button>
                </Flex>
            }
        >
            <Flex gap={6} align="center">
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ fontSize: "24px" }}
                />
                <div>Practicum Instructor Information</div>
            </Flex>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name!",
                                },
                            ]}
                        >
                            <Input placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Middle Name"
                            name="middle_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your middle name!",
                                },
                            ]}
                        >
                            <Input placeholder="Middle name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your last name!",
                                },
                            ]}
                        >
                            <Input placeholder="Last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={3}>
                        <Form.Item label="Suffix" name="suffix">
                            <Input placeholder="Suffix" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Faculty ID"
                            name="school_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Faculty ID!",
                                },
                            ]}
                        >
                            <Input placeholder="Faculty ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="University Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "Please input a valid email!",
                                },
                                {
                                    pattern:
                                        /^[a-zA-Z0-9._%+-]+@urios\.edu\.ph$/,
                                    message:
                                        "Email must be a @urios.edu.ph address!",
                                },
                            ]}
                        >
                            <Input placeholder="@urios.edu.ph" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item
                            label="Department"
                            name="department_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a department!",
                                },
                            ]}
                        >
                            <Select
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
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number!",
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
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your gender!",
                                },
                            ]}
                        >
                            <Select
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
                <Row className="password-input-row" gutter={[16, 0]}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            layout="horizontal"
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password",
                                },
                                {
                                    min: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                {
                                    validator: (_, value) => {
                                        // Regular expression to validate password
                                        const passwordValidation =
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                        if (
                                            !value ||
                                            passwordValidation.test(value)
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Password must contain at least one letter, one number, and one special character!"
                                            )
                                        );
                                    },
                                },
                            ]}
                        >
                            <Input.Password placeholder="Please enter your password" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <>
                                    Confirm <br /> Password
                                </>
                            }
                            name="password_confirmation"
                            className="confirm-input"
                            layout="horizontal"
                            colon={false}
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "The password that you entered does not match!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Please re-enter your password" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <p>
                            Please choose a password that is at least{" "}
                            <span>
                                8 characters long (letters, numbers, and
                                symbols)
                            </span>{" "}
                            to make it more secure.
                        </p>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
