import React from "react";
import { Card, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFolderOpen, faList } from "@fortawesome/pro-solid-svg-icons";
import { faFilePdf } from "@fortawesome/pro-regular-svg-icons";

export default function CardFeatures() {
	return (
		<Card className="card-features">
			<div className="title">Features</div>

			<Row>
				<Card>
					<FontAwesomeIcon
						icon={faCode}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>

					<div className="feature-title">Automated Formatting</div>
					<p className="feature-desc">
						Saves student time and ensuring documents meet institutional
						standards for professionalism and quality.
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
						icon={faFilePdf}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>
					<div className="feature-title">Export Ease</div>
					<p className="feature-desc">
						Enabling document export from the portal enhances both convenience
						and accessibility.
					</p>
				</Card>
			</Row>

			<Row>
				<Card>
					<FontAwesomeIcon
						icon={faList}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>
					<div className="feature-title">Paperwork Status</div>
					<p className="feature-desc">
						Provides real-time updates on the status of submitted paperwork,
						ensuring transparency and timely follow-up.
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
						icon={faFolderOpen}
						style={{
							fontSize: "44px",
							color: "#BDC1CA",
							paddingBottom: "8px",
						}}
					/>
					<div className="feature-title">Daily Logs</div>
					<p className="feature-desc">
						Students can keep detailed daily time records and progress tracking
						essential for self-assessment and goal setting.
					</p>
				</Card>
			</Row>
		</Card>
	);
}
