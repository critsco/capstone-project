import React from "react";

import { userData } from "../../../providers/companyInfo";
import PageFacultyDashboard from "./components/Faculty/PageFacultyDashboard/PageFacultyDashboard";
import PageStudentDashboard from "./components/Student/PageStudentDashboard/PageStudentDashboard";

export default function PageDashboard() {
    const userdata = userData();

    return (
        <>
            {userdata.user_role_id === 1 ? (
                <PageFacultyDashboard />
            ) : (
                <PageStudentDashboard />
            )}
        </>
    );
}
