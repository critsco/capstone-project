import React from "react";
import { Button, List, Radio, Space } from "antd";
import { GET } from "../../../../../../../../../providers/useAxiosQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";

export default function DocumentRadio(props) {
    const { setSelectedDocument, setToggleTemplateModalForm } = props;

    const onChange = (e) => {
        setSelectedDocument(e.target.value);
    };

    const {
        data: dataDocumentTemplates,
        isLoading: isLoadingDocumentTemplates,
    } = GET(`api/document_templates`, "document_templates_list");

    return (
        <Radio.Group onChange={onChange} buttonStyle="solid">
            <Space direction="vertical">
                <List
                    dataSource={
                        dataDocumentTemplates && dataDocumentTemplates?.data
                    }
                    loading={isLoadingDocumentTemplates}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    onClick={() =>
                                        setToggleTemplateModalForm({
                                            open: true,
                                            data: item,
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>,
                            ]}
                        >
                            <Radio.Button value={item.title}>
                                {item.title}
                            </Radio.Button>
                        </List.Item>
                    )}
                />
                {/* <Radio.Button value="moa">Memorandum of Agreement</Radio.Button>
                <Radio.Button value="ltp">Letter to Parents</Radio.Button>
                <Radio.Button value="wfp">Waiver from Parents</Radio.Button>
                <Radio.Button value="wfs">Waiver from School</Radio.Button>
                <Radio.Button value="endorsement">
                    Endorsement Letter
                </Radio.Button>
                <Radio.Button value="eval_form">Evaluation Form</Radio.Button>
                <Radio.Button value="term_rep">Terminal Report</Radio.Button> */}
            </Space>
        </Radio.Group>
    );
}
