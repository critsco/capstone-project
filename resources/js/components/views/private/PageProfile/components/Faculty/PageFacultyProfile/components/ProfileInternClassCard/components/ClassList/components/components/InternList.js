import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Empty, Flex, List, Skeleton } from "antd";
import React from "react";

export default function InternList() {
    return (
        <Flex vertical gap={8}>
            <div className="info-header">Interns</div>
            <List
                bordered={false}
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item actions={[<a key={1}>Remove</a>]}>
                        <Skeleton title={false} active>
                            <List.Item.Meta title="" description="" />
                        </Skeleton>
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
