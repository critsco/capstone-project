import React from "react";
import { useFocused, useSelected, useSlateStatic } from "slate-react";

import { removeLink } from "../../utils/link.js";
// import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash } from "@fortawesome/pro-regular-svg-icons";
const Link = ({ attributes, element, children }) => {
    const editor = useSlateStatic();
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div className="link">
            <a href={element.href} {...attributes}>
                {children}
            </a>
            {selected && focused && (
                <div className="link-popup" contentEditable="false">
                    <a href={element.href}>{element.href}</a>
                    <button onClick={() => removeLink(editor)}>
                        <FontAwesomeIcon icon={faLinkSlash} size="20px" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Link;
