import React, { useState } from "react";
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
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { faPhone } from "@fortawesome/pro-solid-svg-icons";
import NextModal from "./NextSignupModal";

export default function ModalFormStudentSignup(props) {
    // const { loading, setLoading } = useState(false);
    const { isModalOpen, setIsModalOpen } = props;
    const [nextModalOpen, setNextModalOpen] = useState(false);
    const nextModal = () => {
        setIsModalOpen(false);
        setNextModalOpen(true);
    };

    // const handleOk = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         setOpen(false);
    //     }, 3000);
    // };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    // const onFinish = (values) => {
    //     let data = {
    //         ...values,
    //     };

    //     console.log(data);
    //     setLoading(true);
    //     setIsModalOpen(false);
    //     setNextModalOpen(true);

    //     // axios.post(apiUrl("api/users"), data, {
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //         Authentication: "bearer token",
    //     //     },
    //     // });
    // };

    return (
        <>
            <Modal
                title="Create an AutoForm Account"
                wrapClassName="wrap-student-modal-signup"
                open={isModalOpen}
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
                        onClick={nextModal}
                        style={{
                            background: "#2c3d8f",
                            color: "white",
                            paddingBlock: "16px",
                            fontWeight: "normal",
                        }}
                        key={1}
                    >
                        Next
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
                        Student Information
                    </div>
                </Flex>
                <Form
                    className="wrap-student-form-account"
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    layout="vertical"
                    // onFinish={onFinish}
                >
                    <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                        <Col xs={24} sm={12} md={7}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="First name"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={7}>
                            <Form.Item
                                label="Middle Name"
                                name="middle_name"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="Middle name"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={7}>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="Last name"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={3}>
                            <Form.Item
                                label="Suffix"
                                name="suffix"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input required={true} placeholder="Suffix" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                label="Student ID"
                                name="student_id"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="Student ID"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="University Email"
                                name="email"
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
                        <Col xs={24} sm={12} md={4}>
                            <Form.Item
                                label="Year Level"
                                name="year_level"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="Select"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        {
                                            value: "1",
                                            label: "1st Year",
                                        },
                                        {
                                            value: "2",
                                            label: "2nd Year",
                                        },
                                        {
                                            value: "3",
                                            label: "3rd Year",
                                        },
                                        {
                                            value: "4",
                                            label: "4th Year",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                label="Course"
                                name="course"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="Select"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        {
                                            value: "ap",
                                            label: "AP",
                                        },
                                        {
                                            value: "asp",
                                            label: "ASP",
                                        },
                                        {
                                            value: "bap",
                                            label: "BAP",
                                        },
                                        {
                                            value: "csp",
                                            label: "CSP",
                                        },
                                        {
                                            value: "cjep",
                                            label: "CJEP",
                                        },
                                        {
                                            value: "etp",
                                            label: "ETP",
                                        },
                                        { value: "np", label: "NP" },
                                        {
                                            value: "tep",
                                            label: "TEP",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="+63"
                                    addonBefore={
                                        <FontAwesomeIcon icon={faPhone} />
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Birthdate"
                                name="birthdate"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <DatePicker
                                    required={true}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Gender"
                                name="gender"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="Select"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Region"
                                name="region"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="Region"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Province"
                                name="province"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="Province"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="City/Municipality"
                                name="city_municipality"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Select
                                    required={true}
                                    placeholder="City/Municipality"
                                    style={{
                                        width: "100%",
                                        fontWeight: "normal",
                                    }}
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]} style={{ marginBottom: "-14px" }}>
                        <Col xs={24} sm={24} md={20}>
                            <Form.Item
                                label="Street Address"
                                name="street_address"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input
                                    required={true}
                                    placeholder="Street address"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={4}>
                            <Form.Item
                                label="Zip Code"
                                name="zip_code"
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                <Input required={true} placeholder="Zip Code" />
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
                                                getFieldValue("password") ===
                                                    value
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
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <p
                                style={{
                                    color: "#BDC1CA",
                                    fontSize: "12px",
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
            </Modal>
            <NextModal
                isModalOpen={nextModalOpen}
                setIsModalOpen={setNextModalOpen}
            />
        </>
    );
}
