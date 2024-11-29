import React, { useState } from "react";
import { Button, Flex } from "antd";

import DocumentRadio from "./components/DocumentRadio";
import TemplateModalForm from "./components/TemplateModalForm";
import VariableModalForm from "./components/VariableModalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function DocumentSidebar(props) {
    const { selectedDocument, setSelectedDocument } = props;
    const [toggleTemplateModalForm, setToggleTemplateModalForm] = useState({
        open: false,
        data: null,
    });
    const [toggleVariableModalForm, setToggleVariableModalForm] = useState({
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
                <Flex justify="center" align="center" gap={6}>
                    <Button
                        onClick={() =>
                            setToggleTemplateModalForm({
                                open: true,
                                data: null,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Template
                    </Button>
                    <Button
                        onClick={() =>
                            setToggleVariableModalForm({
                                open: true,
                                data: null,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Variables
                    </Button>
                </Flex>
            </Flex>

            <TemplateModalForm
                toggleTemplateModalForm={toggleTemplateModalForm}
                setToggleTemplateModalForm={setToggleTemplateModalForm}
            />
            <VariableModalForm
                toggleVariableModalForm={toggleVariableModalForm}
                setToggleVariableModalForm={setToggleVariableModalForm}
            />
        </>
    );
}
