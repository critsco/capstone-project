import React, { useEffect, useState } from "react";

import Footer from "../../../../ui/Footer";
import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import ModalFormStudentSignup from "./ModalFormStudentSignup";
import StudentFeaturesCard from "./StudentFeaturesCard";
import axios from "axios";

export default function StudentLoginPage(props) {
    const { title } = props;

    const apiUrl = (url) => window.location.origin + "/" + url;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNextModalOpen, setIsNextModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showNextModal = () => {
        setIsModalOpen(false);
        setIsNextModalOpen(true);
    };

    const onFinish = (values) => {
        let data = {
            ...values,
        };

        axios.post(apiUrl("api/users"), data, {
            headers: {
                "Content-Type": "application/json",
                Authentication: "bearer token",
            },
        });
    };

    return (
        <Layout id="studentlogin">
            <Layout.Content>
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <StudentFeaturesCard />
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Card
                            className="studentlogincard"
                            style={{
                                minHeight: "96vh",
                                border: "0",
                                borderRadius: "0",
                                paddingInline: "10%",
                                paddingBlock: "0",
                                marginTop: "-10px",
                            }}
                        >
                            <Row id="header-buttons">
                                <Button
                                    type="text"
                                    style={{
                                        padding: "0",
                                        border: "0",
                                        borderRadius: "0",
                                        textDecoration: "none",
                                    }}
                                    href="./faculty"
                                >
                                    <div className="header-button">
                                        <div className="header-title">
                                            Faculty Portal
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                </Button>
                                <Button
                                    type="text"
                                    style={{
                                        padding: "0",
                                        border: "0",
                                        borderRadius: "0",
                                    }}
                                >
                                    <div className="header-button">
                                        <div className="selected-header">
                                            Student Portal
                                        </div>
                                        <div className="selected-line"></div>
                                    </div>
                                </Button>
                            </Row>
                            <Row
                                style={{
                                    marginBottom: "-20px",
                                }}
                            >
                                <Card className="LoginCard">
                                    <img
                                        width="160"
                                        src="/images/Logo.png"
                                        className="logo"
                                    />
                                    <h1 className="LoginWelcome">
                                        Welcome to AutoForm!
                                    </h1>
                                    <Form
                                        className="wrap-student-login-account"
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                        layout="vertical"
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            label="Student ID"
                                            validateFirst
                                        >
                                            <Input
                                                required={true}
                                                placeholder="Please enter your Student ID"
                                                style={{
                                                    border: "0",
                                                    background: "#F3F4F6",
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            validateFirst
                                        >
                                            <Input.Password
                                                required={true}
                                                placeholder="Please enter your Password"
                                                style={{
                                                    border: "0",
                                                    background: "#F3F4F6",
                                                }}
                                            />
                                        </Form.Item>
                                    </Form>
                                    <Button
                                        type="default"
                                        style={{
                                            marginTop: "3px",
                                            width: "100%",
                                            background: "#2c3d8f",
                                            color: "white",
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                    <div className="student-signup">
                                        <div>Don't have an account?</div>
                                        <Button
                                            type="link"
                                            style={{
                                                border: "0",
                                                padding: "0",
                                                outline: "0",
                                                textDecorationLine: "underline",
                                                color: "#2c3d8f",
                                                fontWeight: "bold",
                                            }}
                                            onClick={showModal}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </Card>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Layout.Content>

            <Footer />
            <ModalFormStudentSignup
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                showNextModal={showNextModal}
            />
        </Layout>
    );
}
