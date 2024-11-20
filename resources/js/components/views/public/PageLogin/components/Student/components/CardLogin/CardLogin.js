import React, { useState } from "react";
import { Alert, Button, Card, Flex, Form, Input, Row } from "antd";

import { POST } from "../../../../../../../providers/useAxiosQuery";
import { encrypt } from "../../../../../../../providers/companyInfo";
import SignupModal from "./components/SignupModal";

export default function CardLogin(props) {
    const { setToggleLoginForm } = props;
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
    });

    const [errorMessageLogin, setErrorMessageLogin] = useState({
        type: "",
        message: "",
    });

    const { mutate: mutateStudentLogin, isLoading: isLoadingStudentLogin } =
        POST(`api/login`, "login_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            user_role_id: 2,
        };

        mutateStudentLogin(data, {
            onSuccess: (res) => {
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
                const errorMessage =
                    err?.response?.data?.message ||
                    "An error occurred during login.";
                const errorStatus = err?.response?.status;

                if (errorStatus === 403) {
                    // Display "inactive" message for 403 errors
                    setErrorMessageLogin({
                        type: "error",
                        message:
                            "Account is inactive. Please wait for a faculty to activate your account.",
                    });
                } else if (errorStatus === 401) {
                    // Display "incorrect credentials" message for 401 errors
                    setErrorMessageLogin({
                        type: "error",
                        message: "Unrecognized email or password.",
                    });
                } else {
                    // Display general error message
                    setErrorMessageLogin({
                        type: "error",
                        message: errorMessage,
                    });
                }
            },
        });
    };

    return (
        <>
            <Card className="card-login">
                <Row className="header-buttons">
                    <Button
                        type="text"
                        onClick={() => {
                            setToggleLoginForm(true);
                        }}
                    >
                        <div className="header-title">Faculty Portal</div>
                        <div className="line"></div>
                    </Button>
                    <Button type="text">
                        <div className="selected-header">Student Portal</div>
                        <div className="selected-line"></div>
                    </Button>
                </Row>
                <Row className="card-login">
                    <Card>
                        <img width="160" alt="logo" src="/images/Logo.png" />
                        <h1>Welcome to AutoForm!</h1>
                        <Form
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

                            {errorMessageLogin.message && (
                                <Alert
                                    type={errorMessageLogin.type}
                                    message={errorMessageLogin.message}
                                    showIcon
                                />
                            )}

                            <Button
                                htmlType="submit"
                                loading={isLoadingStudentLogin}
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
