import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./components/Toolbar/Toolbar";
import {
    sizeMap,
    fontFamilyMap,
} from "./components/utils/SlateUtilityFunctions";
import withLinks from "./components/plugins/withLinks";
import withTables from "./components/plugins/withTable";
import withEmbeds from "./components/plugins/withEmbeds";
// import "./Editor.css";
import Link from "./components/Elements/Link/Link";
import Image from "./components/Elements/Image/Image";
import Video from "./components/Elements/Video/Video";

const Element = (props) => {
    const { attributes, children, element } = props;

    switch (element.type) {
        case "headingOne":
            return <h1 {...attributes}>{children}</h1>;
        case "headingTwo":
            return <h2 {...attributes}>{children}</h2>;
        case "headingThree":
            return <h3 {...attributes}>{children}</h3>;
        case "blockquote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "alignLeft":
            return (
                <div
                    style={{ textAlign: "left", listStylePosition: "inside" }}
                    {...attributes}
                >
                    {children}
                </div>
            );
        case "alignCenter":
            return (
                <div
                    style={{ textAlign: "center", listStylePosition: "inside" }}
                    {...attributes}
                >
                    {children}
                </div>
            );
        case "alignRight":
            return (
                <div
                    style={{ textAlign: "right", listStylePosition: "inside" }}
                    {...attributes}
                >
                    {children}
                </div>
            );
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "orderedList":
            return (
                <ol type="1" {...attributes}>
                    {children}
                </ol>
            );
        case "unorderedList":
            return <ul {...attributes}>{children}</ul>;
        case "link":
            return <Link {...props} />;

        case "table":
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            );
        case "table-row":
            return <tr {...attributes}>{children}</tr>;
        case "table-cell":
            return <td {...attributes}>{children}</td>;
        case "image":
            return <Image {...props} />;
        case "video":
            return <Video {...props} />;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.strikethrough) {
        children = (
            <span style={{ textDecoration: "line-through" }}>{children}</span>
        );
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    if (leaf.superscript) {
        children = <sup>{children}</sup>;
    }
    if (leaf.subscript) {
        children = <sub>{children}</sub>;
    }
    if (leaf.color) {
        children = <span style={{ color: leaf.color }}>{children}</span>;
    }
    if (leaf.bgColor) {
        children = (
            <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
        );
    }
    if (leaf.fontSize) {
        const size = sizeMap[leaf.fontSize];
        children = <span style={{ fontSize: size }}>{children}</span>;
        console.log("size", size);
    }
    if (leaf.fontFamily) {
        const family = fontFamilyMap[leaf.fontFamily];
        children = <span style={{ fontFamily: family }}>{children}</span>;
        console.log("family", family);
    }
    return <span {...attributes}>{children}</span>;
};
const SlateEditor = () => {
    const editor = useMemo(
        () =>
            withHistory(
                withEmbeds(withTables(withLinks(withReact(createEditor()))))
            ),
        []
    );

    const [value, setValue] = useState([
        {
            type: "paragaph",
            children: [{ text: "First line of text in Slate JS. " }],
        },
    ]);

    const renderElement = useCallback((props) => <Element {...props} />, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}
        >
            <Toolbar />
            <div className="editor-wrapper">
                <Editable
                    placeholder="Write something"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </div>
        </Slate>
    );
};

export default SlateEditor;
