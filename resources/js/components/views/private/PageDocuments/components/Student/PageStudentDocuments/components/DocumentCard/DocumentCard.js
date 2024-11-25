import React from "react";
import { Flex } from "antd";

export default function DocumentCard(props) {
    const { selectedDocument } = props;

    return (
        <Flex justify="center" className="document-card">
            {selectedDocument ? (
                <iframe
                    src={`api/documents/${selectedDocument}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "scroll",
                    }}
                ></iframe>
            ) : (
                <Flex align="center">Please select a document to preview.</Flex>
            )}
        </Flex>
    );
}
