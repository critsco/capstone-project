import React, { useState } from "react";
import { Empty, Flex, List } from "antd";
import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GET } from "../../../../../../../../../../../../providers/useAxiosQuery";

export default function InternList(props) {
    const { toggleModalView } = props;

    const [filter, setFilter] = useState({
        class_id: toggleModalView.data?.id,
    });

    const { data: dataClassInterns, isLoading: isLoadingClassInterns } = GET(
        `api/get_class_interns?${new URLSearchParams(filter)}`,
        "interns_list"
    );

    return (
        <Flex vertical gap={8}>
            <div className="info-header">Interns</div>
            <List
                dataSource={dataClassInterns && dataClassInterns?.data}
                bordered={false}
                loading={isLoadingClassInterns}
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <a
                                key={1}
                                style={{
                                    textDecoration: "underline",
                                    color: "#C12126",
                                }}
                            >
                                Remove
                            </a>,
                        ]}
                    >
                        <List.Item.Meta
                            title={`${item.fullname} (${item.school_id})`}
                            description={item.user.email}
                        />
                    </List.Item>
                )}
                locale={{
                    emptyText: (
                        <Empty
                            image={
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    style={{ color: "#e7e7e7" }}
                                />
                            }
                            description="No interns found"
                        />
                    ),
                }}
            />
        </Flex>
    );
}
