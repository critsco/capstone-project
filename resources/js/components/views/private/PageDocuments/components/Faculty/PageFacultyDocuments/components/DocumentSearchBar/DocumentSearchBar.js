import React from "react";

import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

export default function DocumentSearchBar() {
    return (
        <div id="document_searchBar">
            <Input.Search
                placeholder="Search"
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
