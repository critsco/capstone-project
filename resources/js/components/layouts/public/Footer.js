import { Flex, Layout } from "antd";
import React from "react";

export default function Footer() {
    return (
        <Layout.Footer>
            <Flex align="center" justify="center" gap={4}>
                <img width="24" alt="logo" src="/images/Logo.png" />
                <div>© AutoForm 2024</div>
            </Flex>
        </Layout.Footer>
    );
}
