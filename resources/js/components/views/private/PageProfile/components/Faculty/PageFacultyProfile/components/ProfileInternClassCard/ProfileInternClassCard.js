import React, { useState } from "react";

import { Button, Col, Flex, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { faTrashXmark } from "@fortawesome/pro-regular-svg-icons";
import AddClassModalForm from "./components/AddClassModalForm/AddClassModalForm";
import ClassList from "./components/ClassList/ClassList";

export default function ProfileInternClassCard(props) {
    const { dataProfile } = props;

    const [toggleAddModalForm, setToggleAddModalForm] = useState({
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
                <div className="card-header-title">Intern Classes</div>
            </Flex>
            <Flex vertical className="card-body" gap={14}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Flex gap={8}>
                            <Button
                                className="add-card"
                                onClick={() =>
                                    setToggleAddModalForm({
                                        open: true,
                                        data: dataProfile,
                                    })
                                }
                            >
                                <Flex
                                    gap={4}
                                    align="center"
                                    justify="center"
                                    style={{ fontSize: "14px" }}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Add Class
                                </Flex>
                            </Button>

                            <ClassList dataProfile={dataProfile} />
                        </Flex>
                    </Col>
                </Row>
            </Flex>

            <AddClassModalForm
                toggleAddModalForm={toggleAddModalForm}
                setToggleAddModalForm={setToggleAddModalForm}
            />
        </div>
    );
}
