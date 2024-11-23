import React from "react";
import { Button, Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import DocumentRadio from "./components/DocumentRadio";

export default function DocumentSidebar(props) {
    const { setSelectedDocument } = props;

    return (
        <Flex vertical className="document-sidebar">
            <div className="title">Printable Documents</div>
            <div className="documents">
                <DocumentRadio setSelectedDocument={setSelectedDocument} />
            </div>
            <Flex vertical="vertical" justify="center" align="center" gap={10}>
                <Button style={{}}>Export</Button>
                <Flex align="start" gap={4}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: "16px" }}
                    />
                    <span>Exported files will be in PDF file format.</span>
                </Flex>
            </Flex>
        </Flex>
    );
}
