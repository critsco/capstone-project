import React from "react";
import { Col, Layout, Row } from "antd";
import DashboardCalendar from "./components/DashboardCalendar/DashboardCalendar";

export default function PageFacultyDashboard() {
	return (
		<Layout.Content>
			<Row gutter={[50, 20]}>
				<Col xs={24} sm={24} md={14} lg={16}>
					<div className="dashboard-title">Calendar</div>
					<DashboardCalendar />
				</Col>
				<Col xs={24} sm={24} md={10} lg={8}>
					<div className="dashboard-title">Upcoming Schedules</div>
					<div className="faculty-dashboard-schedule">
						{/* <FacultyScheduleTable /> */}
					</div>
				</Col>
			</Row>
			<Row gutter={[0, 20]} style={{ marginTop: "20px" }}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<div className="dashboard-title">Intern Status</div>
					{/* <FacultyInternTable /> */}
				</Col>
			</Row>
		</Layout.Content>
	);
}
