import React, { useEffect, useState } from "react";
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

import { GET } from "../../../../../../../../../providers/useAxiosQuery";

export default function EditModalForm(props) {
    const { toggleModalForm, setToggleModalForm, formData, setFormData } =
        props;
    const [form] = Form.useForm();

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (toggleModalForm.editOpen) {
            setLoading(true);

            form.setFieldsValue({
                ...toggleModalForm.data,
                birthdate: toggleModalForm.data?.birthdate
                    ? dayjs(toggleModalForm.data.birthdate)
                    : null,
                department_id: toggleModalForm.data?.department_id,
                course_id: toggleModalForm.data?.course_id,
                region_id: toggleModalForm.data?.profile_address.region_id,
                province_id: toggleModalForm.data?.profile_address.province_id,
                municipality_id:
                    toggleModalForm.data?.profile_address.municipality_id,
                barangay_id: toggleModalForm.data?.profile_address.barangay_id,
                street_address:
                    toggleModalForm.data?.profile_address.street_address,
            });
            setSelectedDepartment(toggleModalForm.data?.department_id);
            setSelectedRegion(toggleModalForm.data?.profile_address.region_id);
            setSelectedProvince(
                toggleModalForm.data?.profile_address.province_id
            );
            setSelectedMunicipality(
                toggleModalForm.data?.profile_address.municipality_id
            );

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalForm.editOpen]);

    useEffect(() => {
        if (dataDepartment) {
            const departmentOptions = dataDepartment?.data.map(
                (department) => ({
                    value: department.id,
                    label: department.department,
                })
            );
            setDepartments(departmentOptions);
        }
    }, [dataDepartment]);

    useEffect(() => {
        if (selectedDepartment && dataDepartment) {
            const selectedDept = dataDepartment?.data.find(
                (department) => department.id === selectedDepartment
            );
            const courseOptions = selectedDept
                ? selectedDept.ref_courses.map((course) => ({
                      value: course.id,
                      label: course.course,
                  }))
                : [];
            setCourses(courseOptions);

            // Set the default course_id to null or the first course if needed
            const currentCourseId = form.getFieldValue("course_id");
            const validCourse = courseOptions.find(
                (course) => course.value === currentCourseId
            );

            // Set course_id to null or the valid course name
            form.setFieldsValue({
                course_id: validCourse ? currentCourseId : null,
            });
        } else {
            setCourses([]); // Clear courses if no department is selected
        }
    }, [selectedDepartment, dataDepartment, form]);

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

    const onNext = () => {
        form.validateFields()
            .then((values) => {
                // Save form data to formData state
                setFormData({
                    ...values,
                    birthdate: values.birthdate
                        ? dayjs(values.birthdate).format("YYYY-MM-DD")
                        : null,
                    id: toggleModalForm && toggleModalForm.data?.id,
                });

                // Open the NextModalForm
                setToggleModalForm({
                    editOpen: false,
                    nextOpen: true,
                });
            })
            .catch((info) => {
                notification.error({
                    message: "Validation Failed",
                    description: "Please complete the required fields.",
                });
            });
    };

    return (
        <Modal
            title="Edit Information"
            wrapClassName="signup-form"
            open={toggleModalForm.editOpen}
            width={850}
            centered
            loading={loading}
            onCancel={() =>
                setToggleModalForm({
                    editOpen: false,
                    nextOpen: false,
                    data: null,
                })
            }
            footer={
                <Flex gap={4} justify="end">
                    <Button
                        key={1}
                        className="cancel-btn"
                        onClick={() =>
                            setToggleModalForm({
                                editOpen: false,
                                nextOpen: false,
                                data: null,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Button key={2} className="submit-btn" onClick={onNext}>
                        Next
                    </Button>
                </Flex>
            }
        >
            <Form form={form} layout="vertical" autoComplete="off">
                <Flex gap={6} align="center">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: "24px" }}
                    />
                    <div>Student Information</div>
                </Flex>
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
                    <Col xs={24} sm={12} md={9}>
                        <Form.Item label="Student ID" name="school_id">
                            <Input required={true} placeholder="Student ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={9}>
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
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item label="Department" name="department_id">
                            <Select
                                required={true}
                                placeholder="Department"
                                options={departments}
                                onChange={handleDepartmentChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item label="Course" name="course_id">
                            <Select
                                required={true}
                                placeholder="Course"
                                options={courses}
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
                                options={barangays}
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
            </Form>
        </Modal>
    );
}
