import React from "react";

import { userData } from "../../../providers/companyInfo";
import PageFacultyDocuments from "./components/Faculty/PageFacultyDocuments/PageFacultyDocuments";
import PageStudentDocuments from "./components/Student/PageStudentDocuments/PageStudentDocuments";

export default function PageDocuments() {
    const userdata = userData();

    return (
        <>
            {userdata.user_role_id === 1 ? (
                <PageFacultyDocuments />
            ) : (
                <PageStudentDocuments userdata={userdata} />
            )}
        </>
    );
}
