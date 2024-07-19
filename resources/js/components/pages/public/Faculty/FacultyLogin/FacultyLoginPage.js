import React, { useEffect, useState } from "react";

import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import ModalFormFacultyLogin from "./ModalFormFacultyLogin";
import Footer from "../../../../ui/Footer";
import FacultyFeaturesCard from "./FacultyFeaturesCard";

export default function FacultyLoginPage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Layout id="facultylogin">
            <Layout.Content>
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <Card
                            className="facultylogincard"
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
                                    }}
                                >
                                    <div className="header-button">
                                        <div className="selected-header">
                                            Faculty Portal
                                        </div>
                                        <div className="selected-line" />
                                    </div>
                                </Button>
                                <Button
                                    type="text"
                                    style={{
                                        padding: "0",
                                        border: "0",
                                        borderRadius: "0",
                                        textDecoration: "none",
                                    }}
                                    href="./"
                                >
                                    <div className="header-button">
                                        <div className="header-title">
                                            Student Portal
                                        </div>
                                        <div className="line"></div>
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
                                        width="150"
                                        src="/images/Logo.png"
                                        className="logo"
                                    />
                                    <h1 className="LoginWelcome">
                                        Welcome to AutoForm!
                                    </h1>
                                    <Form
                                        className="wrap-faculty-login-account"
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                        layout="vertical"
                                    >
                                        <Form.Item
                                            label="Faculty ID"
                                            validateFirst
                                        >
                                            <Input
                                                required={true}
                                                placeholder="Please enter your Faculty Code"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            validateFirst
                                        >
                                            <Input.Password
                                                required={true}
                                                placeholder="Please enter your Password"
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
                                            textDecoration: "none",
                                        }}
                                        href="./faculty/dashboard"
                                    >
                                        Sign In
                                    </Button>
                                    <div className="faculty-signup">
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
                    <Col xs={24} sm={24} md={12}>
                        <FacultyFeaturesCard />
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
            <ModalFormFacultyLogin
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </Layout>
    );
}
