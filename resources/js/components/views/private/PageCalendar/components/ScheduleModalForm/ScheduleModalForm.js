import React, { useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Modal,
    Popconfirm,
    Radio,
    Row,
} from "antd";

import FloatInput from "../../../../../providers/FloatInput";

export default function ScheduleModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [purpose, setPurpose] = useState("Visitation");
    const { form } = Form.useForm();

    const radioChange = (value) => {};

    return (
        <Modal
            title="Set Schedule"
            wrapClassName="schedule-modal"
            open={toggleModalForm.open}
            width={550}
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
            <Form form={form} layout="vertical" autoComplete="off">
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item label="Purpose" name="purpose">
                            <Radio.Group
                                onChange={radioChange}
                                buttonStyle="solid"
                            >
                                <Radio.Button value="Visitation">
                                    Visitation
                                </Radio.Button>
                                <Radio.Button value="Others">
                                    Others
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="intern_name">
                            <FloatInput
                                label="Intern Name"
                                placeholder="Intern Name"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {purpose === "Others" ? (
                    <Row gutter={[8, 0]}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Form.Item name="document">
                                <FloatInput
                                    label="Document"
                                    placeholder="Document"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Form.Item name="note">
                                <FloatInput label="Note" placeholder="Note" />
                            </Form.Item>
                        </Col>
                    </Row>
                ) : null}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Form.Item label="Set Date" name="date">
                            <DatePicker placeholder="Select date" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
