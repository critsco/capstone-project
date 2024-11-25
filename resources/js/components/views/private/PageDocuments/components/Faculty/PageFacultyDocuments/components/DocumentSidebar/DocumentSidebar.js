import React from "react";
import { Button, Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import DocumentRadio from "./components/DocumentRadio";

export default function DocumentSidebar(props) {
    const { selectedDocument, setSelectedDocument } = props;

    const handleExport = () => {
        if (!selectedDocument) {
            alert("Please select a document to export.");
            return;
        }

        // Redirect to the download endpoint
        window.open(`/documents/${selectedDocument}`, "_blank");
    };

    return (
        <Flex vertical className="document-sidebar">
            <div className="title">Printable Documents</div>
            <div className="documents">
                <DocumentRadio setSelectedDocument={setSelectedDocument} />
            </div>
            <Flex vertical="vertical" justify="center" align="center" gap={10}>
                <Button onClick={handleExport}>Export</Button>
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
