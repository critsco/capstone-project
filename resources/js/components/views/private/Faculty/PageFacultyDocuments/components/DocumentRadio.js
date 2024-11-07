import { Radio, Space } from "antd";
import React, { useState } from "react";

export default function DocumentRadio() {
    const [value, setValue] = useState();
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

    return (
        <Radio.Group
            id="document_radio"
            onChange={onChange}
            buttonStyle="solid"
        >
            <Space direction="vertical">
                <Radio.Button value={1}>Letter to Parents</Radio.Button>
                <Radio.Button value={2}>Waiver from Parents</Radio.Button>
                <Radio.Button value={3}>Waiver from School</Radio.Button>
                <Radio.Button value={4}>Memorandum of Agreement</Radio.Button>
                <Radio.Button value={5}>Endorsement Letter</Radio.Button>
                <Radio.Button value={6}>Evaluation Form</Radio.Button>
                <Radio.Button value={7}>Terminal Report</Radio.Button>
            </Space>
        </Radio.Group>
    );
}
