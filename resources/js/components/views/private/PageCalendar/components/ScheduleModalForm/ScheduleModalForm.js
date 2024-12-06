import React, { useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Modal,
    notification,
    Popconfirm,
    Radio,
    Row,
    TimePicker,
} from "antd";
import dayjs from "dayjs";

import { GET, POST } from "../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../providers/notificationErrors";
import FloatSelect from "../../../../../providers/FloatSelect";
import FloatInput from "../../../../../providers/FloatInput";

export default function ScheduleModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();
    const [purpose, setPurpose] = useState("Visitation");

    const { data: dataInterns } = GET(`api/get_interns`, "interns_list");

    console.log("dataInterns: ", dataInterns);

    const radioChange = (e) => {
        const value = e.target.value;
        setPurpose(value);
    };

    const { mutate: mutateSchedule, isLoading: isLoadingSchedule } = POST(
        `api/schedules`,
        "schedules_list"
    );

    const onFinish = (values) => {
        console.log("onFinish: ", values);

        const formattedDate = values.date
            ? dayjs(values.date).format("YYYY-MM-DD")
            : null;
        const formattedTime = values.time
            ? dayjs(values.time).format("HH:mm")
            : null;

        let data = {
            ...values,
            id: toggleModalForm.data?.id || "",
            date: formattedDate,
            time: formattedTime,
        };

        mutateSchedule(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Schedule",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Schedule",
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
            title="Set Schedule"
            wrapClassName="schedule-modal"
            open={toggleModalForm.open}
            width={350}
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
                            loading={isLoadingSchedule}
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
                initialValues={{
                    purpose: "Visitation",
                }}
            >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
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
                <Row gutter={[8, 0]} style={{ marginTop: "15px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="profile_id">
                            <FloatSelect
                                label="Intern Name"
                                placeholder="Intern Name"
                                options={
                                    dataInterns && dataInterns.data
                                        ? dataInterns.data.map((item) => ({
                                              value: item.id,
                                              label: item.fullname,
                                          }))
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {purpose === "Others" ? (
                    <Row gutter={[8, 0]} style={{ marginTop: "10px" }}>
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
                <Row gutter={[8, 0]} style={{ marginTop: "10px" }}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Form.Item label="Set Date" name="date">
                            <DatePicker placeholder="Select date" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Form.Item label="Set Time" name="time">
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
