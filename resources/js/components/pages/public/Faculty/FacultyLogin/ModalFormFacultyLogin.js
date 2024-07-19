import React, { useState } from "react";
import { Button, Col, Flex, Form, Input, Modal, Row, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { faPhone } from "@fortawesome/pro-solid-svg-icons";
import CheckboxFacultyLogin from "./CheckboxFacultyLogin";

export default function ModalFormFacultyLogin(props) {
    const { loading, setLoading } = useState(false);
    const { isModalOpen, setIsModalOpen } = props;

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Create an AutoForm Account"
            wrapClassName="wrap-faculty-modal-signup"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleClose}
            width={750}
            footer={[
                <Button
                    type="default"
                    onClick={handleClose}
                    style={{
                        background: "#9095a1",
                        color: "white",
                        paddingBlock: "16px",
                        fontWeight: "normal",
                    }}
                    key={0}
                >
                    Close
                </Button>,
                <Button
                    type="default"
                    loading={loading}
                    onClick={handleOk}
                    style={{
                        background: "#2c3d8f",
                        color: "white",
                        paddingBlock: "16px",
                        fontWeight: "normal",
                    }}
                    key={1}
                >
                    Sign Up
                </Button>,
            ]}
        >
            <Flex gap={6} align="center" style={{ marginBottom: "4px" }}>
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ fontSize: "24px" }}
                />
                <div
                    style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        fontFamily: "PoppinsBold",
                    }}
                >
                    Practicum Instructor Information
                </div>
            </Flex>
            <Form
                className="wrap-faculty-form-account"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="First Name"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input required={true} placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Middle Name"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input required={true} placeholder="Middle name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Last Name"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input required={true} placeholder="Last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={3}>
                        <Form.Item
                            label="Suffix"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input required={true} placeholder="Suffix" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Faculty ID"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input required={true} placeholder="Faculty ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="University Email"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input
                                required={true}
                                placeholder="@urios.edu.ph"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item
                            label="Department"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Select
                                required={true}
                                placeholder="Select"
                                style={{ width: "100%", fontWeight: "normal" }}
                                options={[
                                    {
                                        value: "ap",
                                        label: "Accountancy Program",
                                    },
                                    {
                                        value: "asp",
                                        label: "Arts and Science Program",
                                    },
                                    {
                                        value: "bap",
                                        label: "Business Administration Program",
                                    },
                                    {
                                        value: "csp",
                                        label: "Computer Studies Program",
                                    },
                                    {
                                        value: "cjep",
                                        label: "Criminal Justice Education Program",
                                    },
                                    {
                                        value: "etp",
                                        label: "Engineering and Technology Program",
                                    },
                                    { value: "np", label: "Nursing Program" },
                                    {
                                        value: "tep",
                                        label: "Teachers Education Program",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Phone"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Input
                                required={true}
                                placeholder="+63"
                                addonBefore={<FontAwesomeIcon icon={faPhone} />}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="Gender"
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <Select
                                required={true}
                                placeholder="Select"
                                style={{ width: "100%", fontWeight: "normal" }}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]} style={{ paddingTop: "8px" }}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            style={{
                                fontSize: "20px",

                                marginBottom: "8px",
                            }}
                            layout="horizontal"
                            colon={false}
                            rules={[
                                {
                                    min: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            ]}
                        >
                            <Input.Password
                                required={true}
                                placeholder="Please enter your password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            style={{
                                fontSize: "20px",
                            }}
                            layout="horizontal"
                            colon={false}
                            rules={[
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
                            <Input.Password
                                required={true}
                                placeholder="Please re-enter your password"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <p
                            style={{
                                color: "#BDC1CA",
                                fontSize: "12px",
                                // marginTop: "24px",
                                textAlign: "justify",
                                fontWeight: "normal",
                            }}
                        >
                            Please choose a password that is at least{" "}
                            <span style={{ color: "black" }}>
                                8 characters long (letters, numbers, and
                                symbols)
                            </span>{" "}
                            to make it more secure.
                        </p>
                    </Col>
                </Row>
            </Form>
            <Flex>
                <CheckboxFacultyLogin />
            </Flex>
        </Modal>
    );
}
