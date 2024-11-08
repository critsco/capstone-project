import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Flex, Form, Input, notification, Row } from "antd";

import { POST } from "../../../../../providers/useAxiosQuery";
import { encrypt } from "../../../../../providers/companyInfo";
import notificationErrors from "../../../../../providers/notificationErrors";
import SignupModal from "./components/SignupModal";

export default function CardLogin() {
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
    });
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate: mutateFacultyLogin, isLoading: isLoadingFacultyLogin } =
        POST(`api/login`, "login_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            user_role_id: "1",
        };

        mutateFacultyLogin(data, {
            onSuccess: (res) => {
                console.log("res", res);
                console.log("res.data: ", res.data);

                if (res.success) {
                    localStorage.userdata = encrypt(JSON.stringify(res.data));
                    localStorage.token = res.token;

                    window.location.reload();
                } else {
                    setErrorMessageLogin({
                        type: "error",
                        message: res.message,
                    });
                }
            },
            onError: (err) => {
                setErrorMessageLogin({
                    type: "error",
                    message: <>Unrecognized email or password.</>,
                });
            },
        });
    };

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
                            form={form}
                            layout="vertical"
                            className="login-form"
                            autoComplete="off"
                            onFinish={onFinish}
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
                                    form.submit();
                                }}
                                loading={isLoadingFacultyLogin}
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
