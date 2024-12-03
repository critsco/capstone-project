import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import {
    Button,
    Col,
    Empty,
    Flex,
    Form,
    List,
    Modal,
    notification,
    Popconfirm,
    Row,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";

import { GET, POST } from "../../../../../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../../../../../providers/notificationErrors";
import FloatInput from "../../../../../../../../../providers/FloatInput";

const fontSizes = [
    "8pt",
    "10pt",
    "12pt",
    "14pt",
    "16pt",
    "18pt",
    "20pt",
    "22pt",
    "24pt",
    "26pt",
    "28pt",
    "30pt",
];

const fonts = ["Arial", "Georgia", "Courier", "Verdana", "Times New Roman"];

const FontSize = Quill.import("attributors/style/size");
const Font = Quill.import("attributors/style/font");
FontSize.whitelist = fontSizes;
Font.whitelist = fonts;
Quill.register(FontSize, true);
Quill.register(Font, true);
Quill.register("modules/imageResize", ImageResize);

export default function TemplateModalForm(props) {
    const { toggleTemplateModalForm, setToggleTemplateModalForm } = props;

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
    ];

    const modulesToolBar = {
        toolbar: [
            [{ font: fonts }],
            [{ header: [1, 2, 3, 4, 5, false] }],
            [{ size: fontSizes }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: [] }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
        imageResize: {
            modules: ["Resize", "DisplaySize"],
        },
    };

    const quillRef = useRef(null);
    const [form] = Form.useForm();

    const {
        mutate: mutateDocumentTemplate,
        isLoading: isLoadingDocumentTemplate,
    } = POST(`api/document_templates`, "document_templates_list");

    const {
        data: dataDocumentVariables,
        isLoading: isLoadingDocumentVariables,
    } = GET(`api/document_variables`, "document_variables_list");

    useEffect(() => {
        if (toggleTemplateModalForm.open) {
            if (toggleTemplateModalForm.data) {
                form.setFieldsValue({
                    ...toggleTemplateModalForm.data,
                });
            }
        } else {
            form.resetFields();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleTemplateModalForm]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id: toggleTemplateModalForm.data?.id || "",
        };

        mutateDocumentTemplate(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Document Template",
                        description: res.message,
                    });
                    form.resetFields();
                    setToggleTemplateModalForm({
                        open: false,
                        data: null,
                    });
                } else {
                    notification.error({
                        message: "Document Template",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.innerText);
    };

    // Handle dropping the text
    const handleDrop = (event) => {
        event.preventDefault();
        const draggedText = event.dataTransfer.getData("text/plain");
        const quill = quillRef.current?.getEditor();

        if (quill && draggedText) {
            const cursorPosition = quill.getSelection()?.index || 0;
            quill.insertText(cursorPosition, `{${draggedText}}`, "user");
            quill.setSelection(cursorPosition + draggedText.length + 2); // Adjust cursor position
        }
    };

    // Allow dropping by preventing the default behavior
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Modal
            title="Document Template Form"
            wrapClassName="template-form"
            open={toggleTemplateModalForm.open}
            width={850}
            centered
            onCancel={() =>
                setToggleTemplateModalForm({
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
                            setToggleTemplateModalForm({
                                open: false,
                                data: null,
                            })
                        }
                    >
                        Cancel
                    </Button>
                    <Popconfirm
                        key={2}
                        rootClassName="confirm-btn"
                        title="Confirmation"
                        description="Are you sure you want to submit?"
                        onConfirm={() => form.submit()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="submit-btn"
                            loading={isLoadingDocumentTemplate}
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
            >
                <Row gutter={[8, 0]}>
                    <Col xs={24} sm={24} md={18}>
                        <Row gutter={[8, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <Form.Item
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input a title!",
                                        },
                                    ]}
                                >
                                    <FloatInput
                                        label="Title"
                                        placeholder="Title"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <Form.Item
                                        name="content"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input content!",
                                            },
                                        ]}
                                    >
                                        <ReactQuill
                                            ref={quillRef}
                                            theme="snow"
                                            modules={modulesToolBar}
                                            formats={formats}
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                        <Flex
                            className="variable-list"
                            justify="start"
                            align="center"
                            vertical
                        >
                            <Flex vertical align="center">
                                <div style={{ fontWeight: "bold" }}>
                                    Variable List
                                </div>
                                <Flex
                                    align="start"
                                    style={{ fontSize: "10px" }}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Drag a variable into the text editor to
                                    insert.
                                </Flex>
                            </Flex>
                            <List
                                dataSource={
                                    dataDocumentVariables &&
                                    dataDocumentVariables?.data
                                }
                                locale={{
                                    emptyText: (
                                        <Empty description="No variable found" />
                                    ),
                                }}
                                loading={isLoadingDocumentVariables}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div
                                            className="list-item"
                                            draggable
                                            onDragStart={handleDragStart}
                                        >
                                            {item.variable_name}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
