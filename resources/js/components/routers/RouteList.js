import { Route, Routes } from "react-router-dom";

import StudentLoginPage from "../pages/public/Student/StudentLogin/StudentLoginPage";
import FacultyDashboardPage from "../pages/private/Faculty/FacultyDashboard/FacultyDashboardPage";
import FacultyLoginPage from "../pages/public/Faculty/FacultyLogin/FacultyLoginPage";
import FacultyInternStatusPage from "../pages/private/Faculty/FacultyInternStatus/FacultyInternStatusPage";
import FacultyDocumentsPage from "../pages/private/Faculty/FacultyDocuments/FacultyDocumentsPage";
import FacultyCalendarPage from "../pages/private/Faculty/FacultyCalendar/FacultyCalendarPage";
import FacultyProfilePage from "../pages/private/Faculty/FacultyProfile/FacultyProfilePage";

export default function RouteList() {
    return (
        <Routes>
            // Faculty Faculty
            <Route
                path="/faculty"
                element={<FacultyLoginPage title="AutoForm - Faculty Login" />}
            />
            <Route
                path="/faculty/dashboard"
                element={
                    <FacultyDashboardPage title="AutoForm - Faculty Dashboard" />
                }
            />
            <Route
                path="/faculty/internstatus"
                element={
                    <FacultyInternStatusPage title="AutoForm - Faculty Intern Status" />
                }
            />
            <Route
                path="/faculty/documents"
                element={
                    <FacultyDocumentsPage title="AutoForm - Faculty Documents" />
                }
            />
            <Route
                path="/faculty/calendar"
                element={
                    <FacultyCalendarPage title="AutoForm - Faculty Calendar" />
                }
            />
            <Route
                path="/faculty/profile"
                element={
                    <FacultyProfilePage title="AutoForm - Faculty Profile" />
                }
            />
            // Student Portal
            <Route
                path="/"
                element={<StudentLoginPage title="AutoForm - Student Login" />}
            />
        </Routes>
    );
}
