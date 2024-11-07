import React, { useRef, useState } from "react";
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
import dayjs from "dayjs";

import { GET, POST } from "../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../providers/notificationErrors";

export default function SignupModal(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [registerForm] = Form.useForm();

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedBaranagay, setSelectedBaranagay] = useState(null);

    const { data: dataDepartment } = GET(
        `api/pub_department_list`,
        "department_list"
    );

    const { data: dataYearLevel } = GET(
        `api/pub_year_level_list`,
        "year_level_list"
    );

    const { data: dataAddress } = GET(
        `api/pub_region_dropdown`,
        "region_dropdown"
    );

    console.log("dataAddress", dataAddress);

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

    console.log("municipalities", municipalities);

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
        registerForm.setFieldsValue({
            province_id: null,
            municipality_id: null,
            barangay_id: null,
        });
    };

    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId);
        registerForm.setFieldsValue({
            municipality_id: null,
            barangay_id: null,
        });
    };

    const handleMunicipalityChange = (municipalityId) => {
        setSelectedMunicipality(municipalityId);
        registerForm.setFieldsValue({
            barangay_id: null,
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
                        onClick={() => registerForm.submit()}
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
                form={registerForm}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
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
                            <Input
                                required={true}
                                placeholder="@urios.edu.ph"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item label="Year Level" name="year_level_id">
                            <Select
                                required={true}
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
                    <Col xs={24} sm={12} md={4}>
                        <Form.Item label="Course" name="department_id">
                            <Select
                                required={true}
                                placeholder="Course"
                                options={
                                    dataDepartment && dataDepartment.data
                                        ? dataDepartment.data.map((item) => ({
                                              value: item.id,
                                              label: item.department,
                                          }))
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Phone" name="phone">
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
                        <Form.Item label="Region" name="region_id">
                            <Select
                                required={true}
                                placeholder="Region"
                                options={regions}
                                onChange={handleRegionChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Province" name="province_id">
                            <Select
                                required={true}
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
                        >
                            <Select
                                required={true}
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
                        <Form.Item label="Barangay" name="barangay_id">
                            <Select
                                required={true}
                                placeholder="City/Municipality"
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                disabled={!selectedBaranagay}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <Form.Item label="Street Address" name="street_address">
                            <Input
                                required={true}
                                placeholder="Street address"
                            />
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
                            <Input.Password
                                required={true}
                                placeholder="Please re-enter your password"
                            />
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
