import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Flex, Form, Input, Row } from "antd";

import AuthContext from "../../../../../../context/AuthContext";
import SignupModal from "./components/SignupModal";

export default function CardLogin() {
	const [openModalForm, setOpenModalForm] = useState(false);
	const [form] = Form.useForm();
	const { loginUser } = useContext(AuthContext);

	const onFinish = async (values) => {
		await loginUser(values.email, values.password, 1);
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
							>
								Sign In
							</Button>
						</Form>

						<Flex align="center" justify="center" gap="0.25rem">
							<div>Don't have an account?</div>
							<Button onClick={() => setOpenModalForm(true)}>Sign Up</Button>
						</Flex>
					</Card>
				</Row>
			</Card>
			<SignupModal open={openModalForm} close={() => setOpenModalForm(false)} />
		</>
	);
}
