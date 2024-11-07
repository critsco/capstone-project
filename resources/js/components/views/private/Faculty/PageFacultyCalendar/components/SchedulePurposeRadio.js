import React from "react";

import { Radio } from "antd";

export default function SchedulePurposeRadio({ setPurpose }) {
    const onChange = (e) => {
        setPurpose(e.target.value);
    };

    return (
        <>
            <Radio.Group
                onChange={onChange}
                defaultValue="visitation"
                buttonStyle="solid"
                optionType="button"
            >
                <Radio.Button value="visitation">Visitation</Radio.Button>
                <Radio.Button value="others">Others</Radio.Button>
            </Radio.Group>
        </>
    );
}
