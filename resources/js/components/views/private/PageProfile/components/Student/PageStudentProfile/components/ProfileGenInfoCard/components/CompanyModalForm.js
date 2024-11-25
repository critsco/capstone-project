import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Modal,
    notification,
    Popconfirm,
    Row,
    Select,
} from "antd";

import { GET, POST } from "../../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../../providers/notificationErrors";

export default function CompanyModalForm(props) {
    const { toggleCompanyModalForm, setToggleCompanyModalForm } = props;
    const [form] = Form.useForm();
    const [selectedCompanyDetails, setSelectedCompanyDetails] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(null);

    const { data: dataCompany, isLoading: isLoadingDataCompany } = GET(
        `api/companies`,
        "companies_list"
    );

    console.log("toggleCompanyModalForm: ", toggleCompanyModalForm);

    const { mutate: mutateProfileCompany, isLoading: isLoadingProfileCompany } =
        POST(`api/update_profile_company`, "profile_company_list");

    useEffect(() => {
        if (
            toggleCompanyModalForm?.open &&
            toggleCompanyModalForm?.data?.company_id
        ) {
            form.setFieldsValue({
                company_name: toggleCompanyModalForm.data.company?.company_name,
                office: toggleCompanyModalForm.data.company?.office,
            });
            setSelectedCompany(
                toggleCompanyModalForm.data.company?.company_name
            );

            const selectedData = dataCompany?.data.find(
                (item) =>
                    item.company_name ===
                        toggleCompanyModalForm.data.company?.company_name &&
                    item.office === toggleCompanyModalForm.data.company?.office
            );
            setSelectedCompanyDetails({
                office_head: selectedData?.office_head,
                email: selectedData?.email,
                address: selectedData?.address,
            });
        }
    }, [toggleCompanyModalForm.open]);

    const onCompanyFinish = (values) => {
        let data = {
            ...values,
            student_profile_id: toggleCompanyModalForm?.data.id,
        };

        console.log("onFinish: ", data);

        mutateProfileCompany(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleCompanyModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Update Company",
                        description: res.message,
                    });
                    window.location.reload();
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

    const uniqueCompanies = dataCompany?.data
        ? Array.from(
              new Map(
                  dataCompany.data.map((item) => [item.company_name, item])
              ).values()
          )
        : [];

    const companies = uniqueCompanies.map((company) => ({
        value: company.company_name,
        label: company.company_name,
    }));

    const handleCompanyChange = (company) => {
        setSelectedCompany(company);
        form.setFieldsValue({ office: null }); // Reset office selection
        setSelectedCompanyDetails({}); // Reset details display
    };

    const handleOfficeChange = (office) => {
        const selectedData = dataCompany?.data.find(
            (company) =>
                company.company_name === selectedCompany &&
                company.office === office
        );
        if (selectedData) {
            setSelectedCompanyDetails({
                office_head: selectedData.office_head,
                email: selectedData.email,
                address: selectedData.address,
            });
        }
    };

    return (
        <Modal
            title={
                toggleCompanyModalForm?.data?.company_id
                    ? "Change Company"
                    : "Choose a Company"
            }
            wrapClassName="company-form"
            open={toggleCompanyModalForm.open}
            width={750}
            centered
            loading={isLoadingDataCompany}
            onCancel={() =>
                setToggleCompanyModalForm({
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
                            setToggleCompanyModalForm({
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
                        description="Are you sure you want to choose this company?"
                        onConfirm={() => form.submit()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="submit-btn"
                            loading={isLoadingProfileCompany}
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
                onFinish={onCompanyFinish}
            >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                            label="Company Name"
                            name="company_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a company!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Company Name"
                                options={companies}
                                onChange={handleCompanyChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                            label="Office"
                            name="office"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select an office!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Office"
                                options={
                                    dataCompany && selectedCompany
                                        ? dataCompany.data
                                              .filter(
                                                  (item) =>
                                                      item.company_name ===
                                                      selectedCompany
                                              )
                                              .map((item) => ({
                                                  value: item.office,
                                                  label: item.office,
                                              }))
                                        : []
                                }
                                onChange={handleOfficeChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {!selectedCompanyDetails ? (
                    <></>
                ) : (
                    <Row style={{ marginTop: "20px" }}>
                        <Col xs={5} sm={5} md={5} lg={5}>
                            <Flex vertical className="info-headers">
                                <div>Office Head</div>
                                <div>Email</div>
                                <div>Address</div>
                            </Flex>
                        </Col>
                        <Col xs={19} sm={19} md={19} lg={19}>
                            <Flex vertical>
                                <div>{selectedCompanyDetails.office_head}</div>
                                <div>{selectedCompanyDetails.email}</div>
                                <div>{selectedCompanyDetails.address}</div>
                            </Flex>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal>
    );
}
