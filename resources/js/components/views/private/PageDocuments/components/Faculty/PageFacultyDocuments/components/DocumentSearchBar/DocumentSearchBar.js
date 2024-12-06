import React from "react";
import { Flex, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";

export default function DocumentSearchBar(props) {
    const { filter, setFilter } = props;

    return (
        <Flex justify="center" className="document-searchbar">
            <Input.Search
                placeholder="Search"
                enterButton={
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{
                            paddingInline: "8px",
                        }}
                    />
                }
                onChange={(e) => {
                    setTimeout(() => {
                        setFilter({
                            ...filter,
                            search: e.target.value,
                        });
                    });
                }}
            />
        </Flex>
    );
}
