import React, { useState } from "react";

import PageStudentLogin from "./components/Student/PageStudentLogin";
import PageFacultyLogin from "./components/Faculty/PageFacultyLogin";

export default function PageLogin() {
    const [toggleLoginForm, setToggleLoginForm] = useState(false);

    return (
        <>
            {toggleLoginForm ? (
                <PageFacultyLogin setToggleLoginForm={setToggleLoginForm} />
            ) : (
                <PageStudentLogin setToggleLoginForm={setToggleLoginForm} />
            )}
        </>
    );
}
