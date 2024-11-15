import React, { useState } from "react";
import { Radio, Space } from "antd";

import { GET } from "../../../../../../../../../providers/useAxiosQuery";

export default function DocumentRadio(props) {
    const { userdata } = props;

    console.log("userdata: ", userdata);

    const [value, setValue] = useState();
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const { data: dataProfile, isLoading: isLoadingDataProfile } = GET(
        `api/profile/${userdata.id}`,
        "profile_list"
    );

    console.log("dataProfile: ", dataProfile);

    if (isLoadingDataProfile) {
        return (
            <div className="splash-centered">
                <div className="splash-loader">
                    <div className="splash-inner one"></div>
                    <div className="splash-inner two"></div>
                    <div className="splash-inner three"></div>
                </div>
            </div>
        );
    }

    return (
        <Radio.Group onChange={onChange} buttonStyle="solid">
            <Space direction="vertical">
                {dataProfile?.data.company_id ? (
                    <Radio.Button value={1}>
                        Memorandum of Agreement
                    </Radio.Button>
                ) : null}
                {/* <Radio.Button value={2}>Letter to Parents</Radio.Button>
                <Radio.Button value={3}>Waiver from Parents</Radio.Button>
                <Radio.Button value={4}>Waiver from School</Radio.Button>
                <Radio.Button value={5}>Endorsement Letter</Radio.Button>
                <Radio.Button value={6}>Evaluation Form</Radio.Button>
                <Radio.Button value={7}>Terminal Report</Radio.Button> */}
            </Space>
        </Radio.Group>
    );
}
