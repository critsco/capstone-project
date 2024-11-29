import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";

const fontSizes = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
];

const variables = ["Name", "Email", "Date", "Address"]; // List of variables

const FontSize = Quill.import("attributors/style/size");
FontSize.whitelist = fontSizes;
Quill.register(FontSize, true);
Quill.register("modules/imageResize", ImageResize);

export default function FloatQuill(props) {
    const {
        placeholder,
        className,
        id,
        value,
        onChange,
        onChangeSelection,
        onFocus,
        onBlur,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        disabled,
        ref,
    } = props;

    // const insertVariable = (value, quill) => {
    //     if (!value) return; // Ignore empty selections
    //     const cursorPosition = quill.getSelection()?.index || 0; // Get cursor position
    //     quill.insertText(cursorPosition, `{${value}}`); // Insert variable with brackets
    //     quill.setSelection(cursorPosition + value.length + 2); // Move cursor after the inserted variable
    // };

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
        "video",
        "variable",
    ];

    const modulesToolBar = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                [{ size: fontSizes }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image", "video"],
                [{ variable: variables }],
                ["clean"],
            ],
            // handlers: {
            //     variable: function (value) {
            //         const quill = this.quill; // Access Quill instance
            //         insertVariable(value, quill);
            //     },
            // },
        },
        imageResize: {
            modules: ["Resize", "DisplaySize"],
        },
    };

    return (
        <ReactQuill
            id={id ?? ""}
            ref={ref}
            className="float-wrapper"
            theme="snow"
            modules={modulesToolBar}
            formats={formats}
            placeholder={placeholder ?? "Text Editor"}
            readOnly={disabled ?? false}
            value={value ?? ""}
            onChange={(content, delta, source, editor) => {
                if (onChange) {
                    onChange(content, delta, source, editor);
                }
            }}
            onChangeSelection={(range, source, editor) => {
                if (onChangeSelection) {
                    onChangeSelection(range, source, editor);
                }
            }}
            onFocus={(range, source, editor) => {
                if (onFocus) {
                    onFocus(range, source, editor);
                }
            }}
            onBlur={(previousRange, source, editor) => {
                if (onBlur) {
                    onBlur(previousRange, source, editor);
                }
            }}
            onKeyPress={(event) => {
                if (onKeyPress) {
                    onKeyPress(event);
                }
            }}
            onKeyDown={(event) => {
                if (onKeyDown) {
                    onKeyDown(event);
                }
            }}
            onKeyUp={(event) => {
                if (onKeyUp) {
                    onKeyUp(event);
                }
            }}
        />
    );
}
