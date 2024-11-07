import React from "react";

import { Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

export default function FacultyInternStatusSearchBar() {
    return (
        <div id="status_searchBar">
            <Input.Search
                placeholder="Search"
                style={{
                    border: "0",
                    borderRadius: "0",
                    height: "100%",
                    width: "100%",
                }}
                allowClear
                enterButton={
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{
                            paddingRight: "12px",
                            paddingLeft: "12px",
                            paddingBlock: "25%",
                        }}
                    />
                }
            />
        </div>
    );
}
