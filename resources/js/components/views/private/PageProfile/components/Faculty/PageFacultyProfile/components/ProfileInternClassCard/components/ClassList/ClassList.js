import React from "react";
import { Button, Card, Flex, List } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashXmark } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../../../../../../../../providers/useAxiosQuery";

export default function ClassList(props) {
    const { dataProfile } = props;

    console.log("dataProfile", dataProfile);

    const { data: dataInternClasses } = GET(
        `api/get_classes/${dataProfile?.id}`,
        "intern_classes_list"
    );

    return dataInternClasses ? (
        <List
            grid={{
                gutter: 12,
            }}
            dataSource={dataInternClasses && dataInternClasses?.data}
            renderItem={(item) => (
                <List.Item>
                    <Card className="class-card">
                        <div className="class-title">{item.class_code}</div>
                        <Flex gap={6}>
                            <Button className="view-btn">View</Button>
                            <Button className="delete-btn">
                                <FontAwesomeIcon
                                    icon={faTrashXmark}
                                    size="lg"
                                />
                            </Button>
                        </Flex>
                    </Card>
                </List.Item>
            )}
        />
    ) : (
        <></>
    );
}
