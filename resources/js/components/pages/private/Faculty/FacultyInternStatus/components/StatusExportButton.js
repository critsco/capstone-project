import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex } from "antd";
import React from "react";

export default function StatusExportButton() {
    return (
        <Flex id="status_export_button" align="center" gap={8}>
            <Button>Export</Button>
            <Flex align="center" gap={4}>
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ fontSize: "16px" }}
                />
                <span>Exported files will be in PDF file format.</span>
            </Flex>
        </Flex>
    );
}
