import React, { useState } from "react";
import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Flex, Row } from "antd";

import EditModalForm from "./components/EditModalForm";

export default function ProfileGenInfoCard(props) {
    const { dataProfile } = props;

    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        data: null,
    });

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
                            open: true,
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
                            <div>Faculty ID</div>
                            <div>Email</div>
                            <div>Department</div>
                            <div>Contant No.</div>
                            <div>Gender</div>
                        </Flex>
                    </Col>
                    <Col xs={21} sm={21} md={21} lg={21}>
                        <Flex vertical>
                            <div>{dataProfile?.fullname}</div>
                            <div>{dataProfile?.school_id}</div>
                            <div>{dataProfile?.email}</div>
                            <div>{dataProfile?.ref_department.department}</div>
                            <div>{dataProfile?.phone}</div>
                            <div>{dataProfile?.gender}</div>
                        </Flex>
                    </Col>
                </Row>
            </Flex>
            <EditModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </div>
    );
}
