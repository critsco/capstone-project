import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";

import PageFacultyLogin from "../views/public/Faculty/PageFacultyLogin";
import PageStudentLogin from "../views/public/Student/PageStudentLogin";

export default function RouteList() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/faculty"
                element={
                    <PublicRoute
                        title="AutoForm - Faculty Login"
                        pageId="PageFacultyLogin"
                    >
                        <PageFacultyLogin />
                    </PublicRoute>
                }
            />
            <Route
                path="/"
                element={
                    <PublicRoute
                        title="AutoForm - Student Login"
                        pageId="PageStudentLogin"
                    >
                        <PageStudentLogin />
                    </PublicRoute>
                }
            />
            {/* //Private Routes | Faculty
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
            /> */}

            {/* Page404 Error */}
            <Route path="*" element={<Page404 pageId="Page404" />} />
        </Routes>
    );
}
