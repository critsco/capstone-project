import React from "react";
import { Button, Col, Flex, Form, Input, Modal, notification, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/pro-regular-svg-icons";

import { POST } from "../../../../../../../../../../../providers/useAxiosQuery";
import InternList from "./components/InternList";
import notificationErrors from "../../../../../../../../../../../providers/notificationErrors";

export default function ModalView(props) {
    const { toggleModalView, setToggleModalView } = props;
    const [form] = Form.useForm();

    const { mutate: mutateInvite, isLoading: isLoadingInvite } = POST(
        `api/send_invite_notification`,
        "invite_notification_list"
    );

    const onFinish = (values) => {
        let data = {
            ...values,
            class_code: toggleModalView.data?.class_code,
        };

        console.log("onFinish: ", data);

        mutateInvite(data, {
            onSuccess: (res) => {
                if (res.message) {
                    form.resetFields();
                    notification.success({
                        message: "Invite",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Invite",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

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
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Flex align="center" gap={8}>
                            <Form.Item name="email">
                                <Input placeholder="@urios.edu.ph" />
                            </Form.Item>
                            <Button onClick={() => form.submit()}>
                                Invite
                            </Button>
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
