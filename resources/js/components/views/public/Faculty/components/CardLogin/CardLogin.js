import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Flex, Form, Input, Row } from "antd";

import SignupModal from "./components/SignupModal";

export default function CardLogin() {
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
    });
    const [loginForm] = Form.useForm();

    return (
        <>
            <Card className="card-login">
                <Row className="header-buttons">
                    <Button type="text">
                        <div className="selected-header">Faculty Portal</div>
                        <div className="selected-line" />
                    </Button>
                    <Button type="text">
                        <Link to="/" title="Student Portal">
                            <div className="header-title">Student Portal</div>
                            <div className="line"></div>
                        </Link>
                    </Button>
                </Row>
                <Row className="card-login">
                    <Card>
                        <img width="160" alt="logo" src="/images/Logo.png" />
                        <h1>Welcome to AutoForm!</h1>
                        <Form
                            form={loginForm}
                            layout="vertical"
                            className="login-form"
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                        message: "Please enter a valid email!",
                                    },
                                ]}
                                validateFirst
                            >
                                <Input placeholder="Please enter your Email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your password!",
                                    },
                                ]}
                                validateFirst
                            >
                                <Input.Password placeholder="Please enter your Password" />
                            </Form.Item>

                            <Button
                                onClick={() => {
                                    loginForm.submit();
                                }}
                            >
                                Sign In
                            </Button>
                        </Form>

                        <Flex align="center" justify="center" gap="0.25rem">
                            <div>Don't have an account?</div>
                            <Button
                                onClick={() =>
                                    setToggleModalForm({
                                        open: true,
                                    })
                                }
                            >
                                Sign Up
                            </Button>
                        </Flex>
                    </Card>
                </Row>
            </Card>
            <SignupModal
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </>
    );
}
