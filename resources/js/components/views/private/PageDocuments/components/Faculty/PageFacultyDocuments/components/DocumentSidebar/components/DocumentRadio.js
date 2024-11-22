import React from "react";
import { Radio, Space } from "antd";

export default function DocumentRadio(props) {
    const { setSelectedDocument } = props;

    const onChange = (e) => {
        console.log("radio checked:", e.target.value);
        setSelectedDocument(e.target.value);
    };

    return (
        <Radio.Group onChange={onChange} buttonStyle="solid">
            <Space direction="vertical">
                <Radio.Button value="moa">Memorandum of Agreement</Radio.Button>
                <Radio.Button value="ltp">Letter to Parents</Radio.Button>
                <Radio.Button value="wfp">Waiver from Parents</Radio.Button>
                <Radio.Button value="wfs">Waiver from School</Radio.Button>
                <Radio.Button value="endorsement">
                    Endorsement Letter
                </Radio.Button>
                <Radio.Button value="eval_form">Evaluation Form</Radio.Button>
                <Radio.Button value="term_rep">Terminal Report</Radio.Button>
            </Space>
        </Radio.Group>
    );
}
