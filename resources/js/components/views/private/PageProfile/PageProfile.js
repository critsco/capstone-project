import React from "react";

import { userData } from "../../../providers/companyInfo";
import PageFacultyProfile from "./components/Faculty/PageFacultyProfile/PageFacultyProfile";
import PageStudentProfile from "./components/Student/PageStudentProfile/PageStudentProfile";

export default function PageProfile() {
    const userdata = userData();

    return (
        <>
            {userdata.user_role_id === 1 ? (
                <PageFacultyProfile />
            ) : (
                <PageStudentProfile />
            )}
        </>
    );
}
