import React from "react";
import { Button, Col, Flex, Form, Input, Modal, Row, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhone } from "@fortawesome/pro-regular-svg-icons";

export default function SignupModal(props) {
	const { open, close } = props;
	const [form] = Form.useForm();

	return (
		<Modal
			title="Create an AutoForm Account"
			wrapClassName="signup-form"
			open={open}
			width={850}
			onCancel={close}
			footer={
				<Flex gap={4} justify="end">
					<Button key={1} className="cancel-btn" onClick={close}>
						Cancel
					</Button>
					<Button key={2} className="submit-btn" onClick={() => form.submit()}>
						Submit
					</Button>
				</Flex>
			}
		>
			<Flex gap={6} align="center">
				<FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: "24px" }} />
				<div>Practicum Instructor Information</div>
			</Flex>
			<Form form={form} layout="vertical" autoComplete="off">
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={7}>
						<Form.Item
							label="First Name"
							name="first_name"
							rules={[
								{ required: true, message: "Please input your first name!" },
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
								{ required: true, message: "Please input your middle name!" },
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
								{ required: true, message: "Please input your last name!" },
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
								{ required: true, message: "Please input your Faculty ID!" },
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
									type: "email",
									message: "Please input a valid email!",
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
								{ required: true, message: "Please select a department!" },
							]}
						>
							<Select
								placeholder="Department"
								options={[
									{
										value: "1",
										label: "Accountancy Program",
									},
									{
										value: "2",
										label: "Arts and Science Program",
									},
									{
										value: "3",
										label: "Business Administration Program",
									},
									{
										value: "4",
										label: "Computer Studies Program",
									},
									{
										value: "5",
										label: "Criminal Justice Education Program",
									},
									{
										value: "6",
										label: "Engineering and Technology Program",
									},
									{ value: "7", label: "Nursing Program" },
									{
										value: "8",
										label: "Teachers Education Program",
									},
								]}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={7}>
						<Form.Item
							label="Phone"
							name="phone_no"
							rules={[
								{ required: true, message: "Please input your phone number!" },
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
								{ required: true, message: "Please select your gender!" },
							]}
						>
							<Select
								placeholder="Gender"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
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
									message: "Password must be at least 8 characters",
								},
								{
									validator: (_, value) => {
										// Regular expression to validate password
										const passwordValidation =
											/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
										if (!value || passwordValidation.test(value)) {
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
							name="password2"
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
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The password that you entered does not match!")
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
							<span>8 characters long (letters, numbers, and symbols)</span> to
							make it more secure.
						</p>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}
