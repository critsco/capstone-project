import React, { useEffect, useMemo, useRef } from "react";
// import ReactQuill, { Quill } from "react-quill";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import "react-quill-with-table/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
// import ImageResize from "quill-image-resize-module-react";
// import "react-quill/dist/quill.snow.css";
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
// import SlateEditor from "../../../../../../../../../providers/slateQuill/slateQuill";

// const fontSizes = [
//     "8pt",
//     "10pt",
//     "12pt",
//     "14pt",
//     "16pt",
//     "18pt",
//     "20pt",
//     "22pt",
//     "24pt",
//     "26pt",
//     "28pt",
//     "30pt",
// ];

// const fonts = ["Times New Roman", "Arial", "Georgia", "Courier", "Verdana"];

// const FontSize = Quill.import("attributors/style/size");
// const Font = Quill.import("attributors/style/font");
// FontSize.whitelist = fontSizes;
// Font.whitelist = fonts;
// Quill.register(FontSize, true);
// Quill.register(Font, true);
// Quill.register("modules/imageResize", ImageResize);

Quill.register({ "modules/better-table": QuillBetterTable });

export default function TemplateModalForm(props) {
    const { toggleTemplateModalForm, setToggleTemplateModalForm } = props;

    const reactQuillRef = useRef();
    const [form] = Form.useForm();

    // const formats = [
    //     "header",
    //     "font",
    //     "size",
    //     "bold",
    //     "italic",
    //     "underline",
    //     "strike",
    //     "blockquote",
    //     "list",
    //     "bullet",
    //     "indent",
    //     "link",
    //     "image",
    //     "align",
    // ];

    const insertTable = () => {
        const editor = reactQuillRef.current.getEditor();
        const tableModule = editor.getModule("better-table");
        tableModule.insertTable(3, 3);
    };

    const handleEditorStateChange = (val) => {
        setEditorState(val);
    };

    useEffect(() => {
        console.log("reactQuillRef.current: ", reactQuillRef.current);

        // const initializeEditor = () => {
        //     const editor = reactQuillRef.current.getEditor();

        //     const toolbar = editor.getModule("toolbar");
        //     toolbar.addHandler("table", () => {
        //         insertTable();
        //     });
        // };

        // const timeout = setTimeout(initializeEditor, 100);
        // return () => clearTimeout(timeout); // Cleanup timeout
    }, []);

    const modules = useMemo(
        () => ({
            table: false,
            "better-table": {
                operationMenu: {
                    items: {
                        unmergeCells: {
                            text: "Another unmerge cells name",
                        },
                    },
                },
            },
            keyboard: {
                bindings: QuillBetterTable.keyboardBindings,
            },
            toolbar: [
                [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    { align: [] },
                    { script: "sub" },
                    { script: "super" },
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ], // toggled buttons
                ["formula", "table"],
            ],
        }),
        []
    );

    // c    onst bindings = {
    //     tab: {
    //         key: 9,
    //         handler: function (range) {
    //             // console.log("Tab key pressed at range: ", range); // Debugging log
    //             this.quill.insertText(range.index, "\u00A0", "user");
    //             this.quill.setSelection(range.index + 1); // Move the cursor after the inserted spaces
    //             return false; // Prevent default Tab behavior
    //         },
    //     },
    // };

    // const modulesToolBar = {
    //     toolbar: [
    //         [{ font: fonts }],
    //         [{ header: [1, 2, 3, 4, 5, false] }],
    //         [{ size: fontSizes }],
    //         ["bold", "italic", "underline", "strike", "blockquote"],
    //         [{ align: [] }],
    //         [
    //             { list: "ordered" },
    //             { list: "bullet" },
    //             { indent: "-1" },
    //             { indent: "+1" },
    //         ],
    //         ["link", "image"],
    //         ["clean"],
    //     ],
    //     imageResize: {
    //         modules: ["Resize", "DisplaySize"],
    //     },
    //     keyboard: {
    //         bindings: bindings,
    //     },
    // };

    const {
        mutate: mutateDocumentTemplate,
        isLoading: isLoadingDocumentTemplate,
    } = POST(`api/document_templates`, "document_templates_list");

    const {
        data: dataDocumentVariables,
        isLoading: isLoadingDocumentVariables,
    } = GET(`api/document_variables`, "document_variables_list");

    useEffect(() => {
        console.log("toggleTemplateModalForm: ", toggleTemplateModalForm);

        if (toggleTemplateModalForm.open) {
            if (toggleTemplateModalForm.data) {
                form.setFieldsValue({
                    ...toggleTemplateModalForm.data,
                });
            }
        } else {
            form.resetFields();
            // setTimeout(() => {
            //     const quillInstance = quillRef.current?.getEditor();
            //     if (quillInstance) {
            //         // Reset editor content to match the modal's data
            //         const content = toggleTemplateModalForm.data?.content || "";
            //         quillInstance.root.innerHTML = content;
            //     }
            // }, 0); // Small delay to ensure the editor is ready
        }
    }, [toggleTemplateModalForm]);

    // useEffect(() => {
    //     const quillInstance = quillRef.current?.getEditor();

    //     if (quillInstance) {
    //         // Add a listener to save content on change
    //         const handleChange = (delta, oldDelta, source) => {
    //             if (source === "user") {
    //                 form.setFieldValue("content", quillInstance.root.innerHTML);
    //             }
    //         };

    //         quillInstance.on("text-change", handleChange);

    //         // Cleanup listener on unmount
    //         return () => {
    //             quillInstance.off("text-change", handleChange);
    //         };
    //     }
    // }, [form, bindings]);

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
        // event.dataTransfer.setData("text/plain", event.target.innerText);
    };

    // Handle dropping the text
    const handleDrop = (event) => {
        // event.preventDefault();
        // const draggedText = event.dataTransfer.getData("text/plain");
        // const quill = quillRef.current?.getEditor();
        // if (quill && draggedText) {
        //     const cursorPosition = quill.getSelection()?.index || 0;
        //     quill.insertText(cursorPosition, `${draggedText}`, "user");
        //     quill.setSelection(cursorPosition + draggedText.length + 2); // Adjust cursor position
        // }
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
                                    // className="slate_editor"
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
                                            ref={reactQuillRef}
                                            theme="snow"
                                            modules={modules}
                                            // formats={formats}
                                            onChange={handleEditorStateChange}
                                            placeholder="Write something"
                                            // onChange={(
                                            //     value,
                                            //     delta,
                                            //     source,
                                            //     editor
                                            // ) => {
                                            //     form.setFieldValue(
                                            //         "content",
                                            //         value
                                            //     );
                                            // }}
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
