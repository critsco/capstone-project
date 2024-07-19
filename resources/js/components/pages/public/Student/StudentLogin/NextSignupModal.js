import React from "react";
import { Modal, Form, Input, Button } from "antd";

export default function NextModal({ isModalOpen, setIsModalOpen }) {
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log("Second modal form values:", values);
        // Handle form submission
    };

    return (
        <Modal
            title="Student Details"
            open={isModalOpen}
            onCancel={handleClose}
            footer={null}
        >
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="additional_info"
                    label="Additional Info"
                    rules={[
                        {
                            required: true,
                            message: "Please input additional info!",
                        },
                    ]}
                >
                    <Input placeholder="Enter additional info" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Modal>
    );
}
