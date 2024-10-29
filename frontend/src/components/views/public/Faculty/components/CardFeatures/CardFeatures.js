import {
	faCalendarDays,
	faClock,
	faDesktop,
	faEye,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Divider, Row } from "antd";
import React from "react";

export default function CardFeatures() {
	return (
		<Card className="card-features">
			<div className="title">Features</div>

			<Row>
				<Card>
					<FontAwesomeIcon
						icon={faCalendarDays}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>
					<div className="feature-title">Calendar & Schedule Viewing</div>
					<p className="feature-desc">
						Provides real-time updates on the status of submitted paperwork,
						keeping students informed.
					</p>
				</Card>
				<Divider
					type="vertical"
					style={{
						background: "rgba(255, 255, 255, 0.5)",
						height: "150px",
						alignSelf: "center",
					}}
				/>
				<Card>
					<FontAwesomeIcon
						icon={faClock}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>

					<div className="feature-title">Visitation Scheduling</div>
					<p className="feature-desc">
						Streamlined visitation scheduling improves coordination between
						practicum instructors and organizations.
					</p>
				</Card>
			</Row>

			<Row>
				<Card>
					<FontAwesomeIcon
						icon={faEye}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>

					<div className="feature-title">Intern Status Viewing</div>
					<p className="feature-desc">
						Equipping practicum instructors with document status visibility
						enhances workflow, identifies bottlenecks, and promotes timely task
						completion, boosting productivity.
					</p>
				</Card>
				<Divider
					type="vertical"
					style={{
						background: "rgba(255, 255, 255, 0.5)",
						height: "150px",
						alignSelf: "center",
					}}
				/>
				<Card>
					<FontAwesomeIcon
						icon={faDesktop}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>

					<div className="feature-title">Paperwork Monitoring Board</div>
					<p className="feature-desc">
						Practicum instructors can efficiently track the status and progress
						of intern documents, offering timely support, pinpointing areas for
						enhancement.
					</p>
				</Card>
			</Row>
		</Card>
	);
}
