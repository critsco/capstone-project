import React from "react";
import { Card, List } from "antd";

export default function LogList(props) {
    const { sort } = props;

    const data = [
        {
            title: "Log 1",
        },
        {
            title: "Log 2",
        },
        {
            title: "Log 3",
        },
        {
            title: "Log 4",
        },
        {
            title: "Log 5",
        },
        {
            title: "Log 6",
        },
    ];

    return (
        <List
            grid={{
                gutter: 16,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Log Content</Card>
                </List.Item>
            )}
        />
    );
}
