import React, { useState } from "react";

import { Button, Flex } from "antd";
import DocumentRadio from "./components/DocumentRadio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

export default function DocumentSidebar() {
    return (
        <Flex vertical id="document_sidebar">
            <div className="title">Printable Documents</div>
            <div className="documents">
                <DocumentRadio />
            </div>
            <Flex
                vertical="vertical"
                justify="center"
                align="center"
                className="document_export_button"
                gap={10}
            >
                <Button style={{}}>Export</Button>
                <Flex align="center" gap={4}>
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
