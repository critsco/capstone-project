import React from "react";
import { Col, Layout, Row } from "antd";

import CardFeatures from "./components/CardFeatures/CardFeatures";
import CardLogin from "./components/CardLogin/CardLogin";

export default function StudentLoginPage() {
	return (
		<Layout.Content>
			<Row>
				<Col xs={24} sm={24} md={12}>
					<CardFeatures />
				</Col>

				<Col xs={24} sm={24} md={12}>
					<CardLogin />
				</Col>
			</Row>
		</Layout.Content>
	);
}
