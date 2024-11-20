import React, { useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhone } from "@fortawesome/pro-regular-svg-icons";
import dayjs from "dayjs";

import { GET, POST } from "../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../providers/notificationErrors";

export default function SignupModal(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const { data: dataDepartment } = GET(
        `api/pub_department_dropdown`,
        "department_dropdown"
    );

    const { data: dataYearLevel } = GET(
        `api/pub_year_level_list`,
        "year_level_list"
    );

    const { data: dataAddress } = GET(
        `api/pub_region_dropdown`,
        "region_dropdown"
    );

    const regions = dataAddress?.data.map((region) => ({
        value: region.id,
        label: region.region,
    }));

    const provinces = selectedRegion
        ? dataAddress?.data
              .find((region) => region.id === selectedRegion)
              ?.ref_provinces.map((province) => ({
                  value: province.id,
                  label: province.province,
              })) || []
        : [];

    const municipalities = selectedProvince
        ? dataAddress?.data
              .flatMap((region) => region.ref_provinces)
              .find((province) => province.id === selectedProvince)
              ?.ref_municipalities.map((municipality) => ({
                  value: municipality.id,
                  label: municipality.municipality,
              })) || []
        : [];

    const barangays = selectedMunicipality
        ? dataAddress?.data
              .flatMap((region) => region.ref_provinces)
              .flatMap((province) => province.ref_municipalities)
              .find((municipality) => municipality.id === selectedMunicipality)
              ?.ref_barangays.map((barangay) => ({
                  value: barangay.id,
                  label: barangay.barangay,
              })) || []
        : [];

    const departments = dataDepartment?.data.map((department) => ({
        value: department.id,
        label: department.department,
    }));

    const courses = selectedDepartment
        ? dataDepartment?.data
              .find((department) => department.id === selectedDepartment)
              ?.ref_courses.map((course) => ({
                  value: course.id,
                  label: course.course,
              })) || []
        : [];

    const {
        mutate: mutateStudentRegister,
        isLoading: isLoadingStudentRegister,
    } = POST(`api/register`, "register_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        const formattedBirthdate = values.birthdate
            ? dayjs(values.birthdate).format("YYYY-MM-DD")
            : null;

        let data = {
            ...values,
            user_role_id: 2,
            birthdate: formattedBirthdate,
        };

        mutateStudentRegister(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Registration",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Registration",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const handleRegionChange = (regionId) => {
        setSelectedRegion(regionId);
        setSelectedProvince(null);
        setSelectedMunicipality(null);
        form.setFieldsValue({
            province_id: null,
            municipality_id: null,
            barangay_id: null,
        });
    };

    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId);
        setSelectedMunicipality(null);
        form.setFieldsValue({
            municipality_id: null,
            barangay_id: null,
        });
    };

    const handleMunicipalityChange = (municipalityId) => {
        setSelectedMunicipality(municipalityId);
        form.setFieldsValue({
            barangay_id: null,
        });
    };

    const handleDepartmentChange = (departmentId) => {
        setSelectedDepartment(departmentId);
        form.setFieldsValue({
            course_id: null,
        });
    };

    return (
        <Modal
            title="Create an AutoForm Account"
            wrapClassName="signup-form"
            open={toggleModalForm.open}
            width={850}
            centered
            onCancel={() =>
                setToggleModalForm({
                    open: false,
                })
            }
            footer={
                <Flex gap={4} justify="end">
                    <Button
                        key={1}
                        className="cancel-btn"
                        onClick={() =>
                            setToggleModalForm({
                                open: false,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        key={2}
                        className="submit-btn"
                        onClick={() => form.submit()}
                        loading={isLoadingStudentRegister}
                    >
                        Submit
                    </Button>
                </Flex>
            }
        >
            <Flex gap={6} align="center">
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ fontSize: "24px" }}
                />
                <div>Student Information</div>
            </Flex>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={7}>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name!",
                                },
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
                                {
                                    required: true,
                                    message: "Please input your middle name!",
                                },
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
                                {
                                    required: true,
                                    message: "Please input your last name!",
                                },
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
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item
                            label="Student ID"
                            name="school_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Student ID!",
                                },
                            ]}
                        >
                            <Input placeholder="Student ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item
                            label="University Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "Please input a valid email!",
                                },
                                {
                                    pattern:
                                        /^[a-zA-Z0-9._%+-]+@urios\.edu\.ph$/,
                                    message:
                                        "Email must be a @urios.edu.ph address!",
                                },
                            ]}
                        >
                            <Input placeholder="@urios.edu.ph" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            label="Year Level"
                            name="year_level_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a year level!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Year level"
                                options={
                                    dataYearLevel && dataYearLevel.data
                                        ? dataYearLevel.data.map((item) => ({
                                              value: item.id,
                                              label: item.year_level,
                                          }))
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Department"
                            name="department_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a department!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Department"
                                options={departments}
                                onChange={handleDepartmentChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Course"
                            name="course_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a course!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Course"
                                options={courses}
                                disabled={!selectedDepartment}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a phone number!",
                                },
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
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Birthdate"
                            name="birthdate"
                            rules={[
                                {
                                    required: true,
                                    type: "data",
                                    message: "Please enter your birthdate!",
                                },
                            ]}
                        >
                            <DatePicker
                                placeholder="Birthdate"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a gender!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Gender"
                                options={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                    { value: "Other", label: "Others" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Region"
                            name="region_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a region!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Region"
                                options={regions}
                                onChange={handleRegionChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="Province"
                            name="province_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a province!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Province"
                                options={provinces}
                                onChange={handleProvinceChange}
                                disabled={!selectedRegion}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            label="City/Municipality"
                            name="municipality_id"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select a city/municipality!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="City/Municipality"
                                options={municipalities}
                                onChange={handleMunicipalityChange}
                                disabled={!selectedProvince}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            label="Barangay"
                            name="barangay_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a barangay!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="City/Municipality"
                                options={barangays}
                                disabled={!selectedMunicipality}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <Form.Item
                            label="Street Address"
                            name="street_address"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your street address!",
                                },
                            ]}
                        >
                            <Input placeholder="Street address" />
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
                                    required: true,
                                    message: "Please enter your password",
                                },
                                {
                                    min: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                {
                                    validator: (_, value) => {
                                        // Regular expression to validate password
                                        const passwordValidation =
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                        if (
                                            !value ||
                                            passwordValidation.test(value)
                                        ) {
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
                            name="password_confirmation"
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
                            <Input.Password placeholder="Please re-enter your password" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <p>
                            Please choose a password that is at least{" "}
                            <span>
                                8 characters long (letters, numbers, and
                                symbols)
                            </span>{" "}
                            to make it more secure.
                        </p>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
