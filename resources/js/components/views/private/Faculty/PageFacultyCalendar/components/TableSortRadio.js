import React from "react";

import { Radio } from "antd";

export default function TableSortRadio({ setSelectedSort }) {
    const onChange = (e) => {
        setSelectedSort(e.target.value);
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
