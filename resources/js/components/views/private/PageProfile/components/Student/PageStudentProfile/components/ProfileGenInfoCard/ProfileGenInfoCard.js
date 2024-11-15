import React, { useState } from "react";
import { Alert, Button, Col, Divider, Flex, Row, Spin } from "antd";
import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditModalForm from "./components/EditModalForm";
import NextModalForm from "./components/NextModalForm";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import CompanyModalForm from "./components/CompanyModalForm";

export default function ProfileGenInfoCard(props) {
    const { dataProfile } = props;

    const [toggleModalForm, setToggleModalForm] = useState({
        editOpen: false,
        nextOpen: false,
        companyOpen: false,
        data: null,
    });

    const [formData, setFormData] = useState(null);

    console.log("dataProfile: ", dataProfile);

    return (
        <div className="card">
            <Flex
                className="card-header"
                align="center"
                justify="space-between"
            >
                <div className="card-header-title">General Information</div>
                <Button
                    onClick={() =>
                        setToggleModalForm({
                            editOpen: true,
                            nextOpen: false,
                            data: dataProfile,
                        })
                    }
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                </Button>
            </Flex>
            <Flex vertical className="card-body" gap="14px">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="card-body-title">
                            Personnal Information
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <Flex vertical className="info-headers">
                            <div>Name</div>
                            <div>Student ID</div>
                            <div>Email</div>
                            <div>Year Level</div>
                            <div>Department</div>
                            <div>Course</div>
                            <div>Address</div>
                            <div>Contact No.</div>
                            <div>Birthdate</div>
                            <div>Gender</div>
                        </Flex>
                    </Col>
                    <Col xs={21} sm={21} md={21} lg={21}>
                        <Flex vertical>
                            <div>{dataProfile?.fullname}</div>
                            <div>{dataProfile?.school_id}</div>
                            <div>{dataProfile?.email}</div>
                            <div>{dataProfile?.ref_year_level.year_level}</div>
                            <div>{dataProfile?.ref_department.department}</div>
                            <div>{dataProfile?.ref_course.course}</div>
                            <div>{dataProfile?.address}</div>
                            <div>{dataProfile?.phone}</div>
                            <div>{dataProfile?.birthdate}</div>
                            <div>{dataProfile?.gender}</div>
                        </Flex>
                    </Col>
                </Row>
            </Flex>
            {dataProfile?.parent_id ? (
                <>
                    <Divider />
                    <Flex vertical className="card-body" gap="14px">
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className="card-body-title">
                                    Parent/Guardian Information
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className="card-body-title">
                                    Company Information
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <Flex vertical className="info-headers">
                                    <div>Name</div>
                                    <div>Relationship</div>
                                    <div>Contact No.</div>
                                </Flex>
                            </Col>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Flex vertical>
                                    <div>{dataProfile?.parent_fullname}</div>
                                    <div>
                                        {
                                            dataProfile?.profile_parent
                                                .relationship
                                        }
                                    </div>
                                    <div>
                                        {dataProfile?.profile_parent.phone}
                                    </div>
                                </Flex>
                            </Col>

                            {dataProfile?.company_id ? (
                                <>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Flex vertical className="info-headers">
                                            <div>Company Name</div>
                                            <div>Office</div>
                                            <div>Office Head</div>
                                            <div>Email</div>
                                        </Flex>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <Flex vertical>
                                            <div>
                                                {
                                                    dataProfile?.company
                                                        .company_name
                                                }
                                            </div>
                                            <div>
                                                {dataProfile?.company.office}
                                            </div>
                                            <div>
                                                {
                                                    dataProfile?.company
                                                        .office_head
                                                }
                                            </div>
                                            <div>
                                                {dataProfile?.company.email}
                                            </div>
                                        </Flex>
                                    </Col>
                                </>
                            ) : (
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Flex
                                        className="company-btn"
                                        align="center"
                                        vertical
                                    >
                                        <div style={{ fontWeight: "600" }}>
                                            Select a Company
                                        </div>
                                        <Button
                                            onClick={() =>
                                                setToggleModalForm({
                                                    companyOpen: true,
                                                })
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </Flex>
                                </Col>
                            )}
                        </Row>
                    </Flex>
                </>
            ) : (
                <Alert
                    type="warning"
                    message="Edit your profile and enter the necessary Parent and Company information to finish setting up your account."
                    showIcon
                />
            )}

            <EditModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
                setFormData={setFormData}
            />
            <NextModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
                formData={formData}
                setFormData={setFormData}
                dataProfile={dataProfile}
            />
            <CompanyModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
                formData={formData}
                dataProfile={dataProfile}
            />
        </div>
    );
}
