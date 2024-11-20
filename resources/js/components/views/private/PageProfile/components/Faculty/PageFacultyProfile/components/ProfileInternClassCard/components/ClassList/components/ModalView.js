import React from "react";
import { Button, Col, Flex, Form, Input, Modal, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/pro-regular-svg-icons";

import InternList from "./components/InternList";

export default function ModalView(props) {
    const { toggleModalView, setToggleModalView } = props;
    const [form] = Form.useForm();

    return (
        <Modal
            title={
                <Flex align="center" gap={8}>
                    <FontAwesomeIcon
                        icon={faFolder}
                        style={{
                            background: "#DEE1E6",
                            color: "#2c3d8f",
                            fontSize: "20px",
                            padding: "8px",
                            borderRadius: "50%",
                        }}
                    />
                    {toggleModalView?.data?.class_code}
                </Flex>
            }
            wrapClassName="view-class"
            open={toggleModalView.open}
            width={500}
            centered
            onCancel={() =>
                setToggleModalView({
                    open: false,
                    data: null,
                })
            }
            footer={null} // Remove the footer for this modal
        >
            <Form form={form} layout="vertical" autoComplete="off">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Flex align="center" gap={8}>
                            <Form.Item name="email">
                                <Input placeholder="@urios.edu.ph" />
                            </Form.Item>
                            <Button>Invite</Button>
                        </Flex>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <InternList />
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
