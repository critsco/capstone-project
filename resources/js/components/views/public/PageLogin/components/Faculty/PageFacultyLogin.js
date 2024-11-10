import React from "react";
import { Col, Layout, Row } from "antd";

import CardFeatures from "./components/CardFeatures/CardFeatures";
import CardLogin from "./components/CardLogin/CardLogin";

export default function PageFacultyLogin(props) {
    const { setToggleLoginForm } = props;

    return (
        <Layout.Content id="PageFacultyLogin">
            <Row>
                <Col xs={24} sm={24} md={12}>
                    <CardLogin setToggleLoginForm={setToggleLoginForm} />
                </Col>

                <Col xs={24} sm={24} md={12}>
                    <CardFeatures />
                </Col>
            </Row>
        </Layout.Content>
    );
}
