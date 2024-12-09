import React, { useEffect } from "react";
import {
    Button,
    Flex,
    Form,
    Input,
    Modal,
    notification,
    Popconfirm,
} from "antd";

import { UPDATE } from "../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../providers/notificationErrors";

export default function NotesModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    const { mutate: mutateInternStatus, isLoading: isLoadingInternStatus } =
        UPDATE(`api/ojt_details`, "ojt_details_list");

    const onFinish = (values) => {
        const { note } = values;

        // Construct payload using id and field from toggleModalForm
        const { id, field } = toggleModalForm;

        // API call to update the note
        mutateInternStatus(
            { id, [field]: note },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        notification.success({
                            message: "Note Updated",
                            description:
                                "The note has been successfully updated.",
                        });
                        // Close the modal and reset the form
                        setToggleModalForm({
                            open: false,
                            id: null,
                            field: null,
                            note: null,
                        });
                    } else {
                        notification.error({
                            message: "Update Failed",
                            description: "Failed to update the note.",
                        });
                    }
                },
                onError: (err) => {
                    notificationErrors(err);
                },
            }
        );
    };

    useEffect(() => {
        if (toggleModalForm.open) {
            form.setFieldsValue({
                note: toggleModalForm.note,
            });
        }

        return () => {};
    }, [toggleModalForm.open]);

    return (
        <Modal
            title="Notes"
            wrapClassName="table-notes-modal"
            open={toggleModalForm.open}
            width={350}
            centered
            onCancel={() =>
                setToggleModalForm({
                    open: false,
                    id: null,
                    field: null,
                    note: null,
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
                                id: null,
                                field: null,
                                note: null,
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
                            loading={isLoadingInternStatus}
                        >
                            Submit
                        </Button>
                    </Popconfirm>
                </Flex>
            }
        >
            <Form
                form={form}
                initialValues={{ note: toggleModalForm?.note }}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Flex align="center" gap={8}>
                    <Form.Item name="note">
                        <Input placeholder="Enter notes here" />
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    );
}
