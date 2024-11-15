import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";

import { GET } from "../../../../../../providers/useAxiosQuery";
import { userData } from "../../../../../../providers/companyInfo";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/pro-regular-svg-icons";

export default function PageStudentDashboard() {
    const userdata = userData();
    const navigate = useNavigate();

    const { data: dataProfile, isLoading: isLoadingDataProfile } = GET(
        `api/profile/${userdata.id}`,
        "profile_list"
    );

    if (isLoadingDataProfile) {
        return (
            <div className="splash-centered">
                <div className="splash-loader">
                    <div className="splash-inner one"></div>
                    <div className="splash-inner two"></div>
                    <div className="splash-inner three"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            {dataProfile?.data.parent_id ? (
                <DashboardContent />
            ) : (
                <Result
                    icon={
                        <FontAwesomeIcon
                            icon={faExclamationCircle}
                            style={{ fontSize: "44px", color: "#2c3d8f" }}
                        />
                    }
                    title="Finish setting up your account to get started."
                    extra={
                        <Button onClick={() => navigate("/profile")}>
                            Go to Profile
                        </Button>
                    }
                />
            )}
        </>
    );
}
