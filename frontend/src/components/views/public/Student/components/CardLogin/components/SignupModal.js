import React from "react";
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
					<Button key={2} className="submit-btn" onClick={form.submit()}>
						Submit
					</Button>
				</Flex>
			}
		>
			<Flex gap={6} align="center">
				<FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: "24px" }} />
				<div>Student Information</div>
			</Flex>
			<Form form={form} layout="vertical" autoComplete="off">
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={7}>
						<Form.Item label="First Name" name="first_name">
							<Input required={true} placeholder="First name" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={7}>
						<Form.Item label="Middle Name" name="middle_name">
							<Input required={true} placeholder="Middle name" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={7}>
						<Form.Item label="Last Name" name="last_name">
							<Input required={true} placeholder="Last name" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={3}>
						<Form.Item label="Suffix" name="suffix">
							<Input required={true} placeholder="Suffix" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={6}>
						<Form.Item label="Student ID" name="school_id">
							<Input required={true} placeholder="Student ID" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="University Email" name="email">
							<Input required={true} placeholder="@urios.edu.ph" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Form.Item label="Year Level" name="year_level_id">
							<Select
								required={true}
								placeholder="Year level"
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
					<Col xs={24} sm={12} md={4}>
						<Form.Item label="Course" name="department_id">
							<Select
								required={true}
								placeholder="Course"
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
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="Phone" name="phone_no">
							<Input
								required={true}
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
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="Birthdate" name="birthdate">
							<DatePicker
								required={true}
								placeholder="Birthdate"
								style={{ width: "100%" }}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="Gender" name="gender">
							<Select
								required={true}
								placeholder="Gender"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
								]}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="Region" name="region_id">
							<Select
								required={true}
								placeholder="Region"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="Province" name="province_id">
							<Select
								required={true}
								placeholder="Province"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Form.Item label="City/Municipality" name="municiaplity_id">
							<Select
								required={true}
								placeholder="City/Municipality"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
								]}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[8, 0]}>
					<Col xs={24} sm={24} md={8}>
						<Form.Item label="Barangay" name="barangay_id">
							<Select
								required={true}
								placeholder="City/Municipality"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={16}>
						<Form.Item label="Street Address" name="street_address">
							<Input required={true} placeholder="Street address" />
						</Form.Item>
					</Col>
				</Row>
				<Row className="password-input-row" gutter={[16, 0]}>
					<Col xs={24} sm={12} md={12}>
						<Form.Item
							name="password"
							label="Password"
							layout="horizontal"
							colon={false}
							rules={[
								{
									min: 8,
									message: "Password must be at least 8 characters",
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
							label={
								<>
									Confirm <br /> Password
								</>
							}
							className="confirm-input"
							layout="horizontal"
							colon={false}
							rules={[
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
							<Input.Password
								required={true}
								placeholder="Please re-enter your password"
							/>
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
