import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    notification,
    Popconfirm,
    Row,
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import { GET, POST } from "../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../providers/notificationErrors";

export default function ModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    console.log("toggleModalForm: ", toggleModalForm);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);

    const { data: dataAddress } = GET(
        `api/pub_region_dropdown`,
        "region_dropdown"
    );

    const { mutate: mutateCompany, isLoading: isLoadingCompany } = POST(
        `api/companies`,
        "companies_list"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            id: toggleModalForm?.data.id,
        };

        mutateCompany(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Update Company",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Update Company",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

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

    useEffect(() => {
        if (toggleModalForm.open) {
            form.setFieldsValue({
                ...toggleModalForm.data,
                region_id: toggleModalForm.data?.profile_address.region_id,
                province_id: toggleModalForm.data?.profile_address.province_id,
                municipality_id:
                    toggleModalForm.data?.profile_address.municipality_id,
                street_address:
                    toggleModalForm.data?.profile_address.street_address,
            });
            setSelectedRegion(toggleModalForm.data?.profile_address.region_id);
            setSelectedProvince(
                toggleModalForm.data?.profile_address.province_id
            );
        }

        return () => {};
    }, [toggleModalForm.open]);

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

    return (
        <Modal
            title="Edit Company"
            wrapClassName="signup-form"
            open={toggleModalForm.open}
            width={750}
            centered
            onCancel={() =>
                setToggleModalForm({
                    open: false,
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
                                open: false,
                                data: null,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Popconfirm
                        key={2}
                        rootClassName="edit-confirm-btn"
                        title="Confirmation"
                        description="Are you sure you want to submit?"
                        onConfirm={() => {
                            form.submit();
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="submit-btn"
                            loading={isLoadingCompany}
                        >
                            Submit
                        </Button>
                    </Popconfirm>
                </Flex>
            }
        >
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Flex gap={6} align="center">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: "24px" }}
                    />
                    <div>Company Information</div>
                </Flex>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Company Name"
                            name="company_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a company name!",
                                },
                            ]}
                        >
                            <Input placeholder="Company name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Office"
                            name="office"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a office!",
                                },
                            ]}
                        >
                            <Input placeholder="Office" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Office Head"
                            name="office_head"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a office head!",
                                },
                            ]}
                        >
                            <Input placeholder="Office head" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the office email!",
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
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
                    <Col xs={24} sm={12} md={16}>
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
                </Row>
                <Row gutter={[8, 0]}>
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
                    <Col xs={24} sm={24} md={16}>
                        <Form.Item
                            label="Street Address"
                            name="street_address"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input company street address!",
                                },
                            ]}
                        >
                            <Input placeholder="Street address" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
