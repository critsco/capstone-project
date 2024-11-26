import React, { useState } from "react";
import { Button, Flex } from "antd";

import DocumentRadio from "./components/DocumentRadio";
import ModalForm from "./components/ModalForm";

export default function DocumentSidebar(props) {
    const { selectedDocument, setSelectedDocument } = props;
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        data: null,
    });

    return (
        <>
            <Flex vertical className="document-sidebar">
                <div className="title">Printable Documents</div>
                <div className="documents">
                    <DocumentRadio setSelectedDocument={setSelectedDocument} />
                </div>
                <Flex vertical justify="center" align="center" gap={6}>
                    <Button
                        onClick={() =>
                            setToggleModalForm({
                                open: true,
                                data: null,
                            })
                        }
                    >
                        Create Template
                    </Button>
                </Flex>
            </Flex>

            <ModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </>
    );
}
