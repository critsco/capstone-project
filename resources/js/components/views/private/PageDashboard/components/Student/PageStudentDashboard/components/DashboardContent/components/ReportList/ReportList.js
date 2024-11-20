import React from "react";
import { Card, Flex, List } from "antd";

export default function ReportList(props) {
    const { sort } = props;

    const data = [
        {
            title: "Report 1",
        },
        {
            title: "Report 2",
        },
        {
            title: "Report 3",
        },
        {
            title: "Report 4",
        },
        {
            title: "Report 5",
        },
        {
            title: "Report 6",
        },
        {
            title: "Report 7",
        },
        {
            title: "Report 8",
        },
        {
            title: "Report 9",
        },
        {
            title: "Report 10",
        },
        {
            title: "Report 11",
        },
    ];

    return (
        <List
            grid={{
                gutter: 12,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Report Content</Card>
                </List.Item>
            )}
        />
    );
}
