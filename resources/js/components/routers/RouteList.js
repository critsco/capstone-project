import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";

import PageFacultyLogin from "../views/public/Faculty/PageFacultyLogin";
import PageStudentLogin from "../views/public/Student/PageStudentLogin";

import PageFacultyDashboard from "../views/private/Faculty/PageFacultyDashboard/PageFacultyDashboard";
import PageFacultyInternStatus from "../views/private/Faculty/PageFacultyInternStatus/PageFacultyInternStatus";
import PageFacultyDocuments from "../views/private/Faculty/PageFacultyDocuments/PageFacultyDocuments";
import PageFacultyCalendar from "../views/private/Faculty/PageFacultyCalendar/PageFacultyCalendar";
import PageFacultyProfile from "../views/private/Faculty/PageFacultyProfile/PageFacultyProfile";

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

            {/* Private Routes | Faculty */}
            <Route
                path="/faculty/dashboard"
                element={
                    <PrivateRoute
                        title="AutoForm - Faculty Dashboard"
                        pageId="PageFacultyDashboard"
                    >
                        <PageFacultyDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/faculty/internstatus"
                element={
                    <PrivateRoute
                        title="AutoForm - Faculty Intern Status"
                        pageId="PageFacultyInternStatus"
                    >
                        <PageFacultyInternStatus />
                    </PrivateRoute>
                }
            />
            <Route
                path="/faculty/documents"
                element={
                    <PrivateRoute
                        title="AutoForm - Faculty Documents"
                        pageId="PageFacultyDocuments"
                    >
                        <PageFacultyDocuments />
                    </PrivateRoute>
                }
            />
            <Route
                path="/faculty/calendar"
                element={
                    <PrivateRoute
                        title="AutoForm - Faculty Calendar"
                        pageId="PageFacultyCalendar"
                    >
                        <PageFacultyCalendar />
                    </PrivateRoute>
                }
            />
            <Route
                path="/faculty/profile"
                element={
                    <PrivateRoute
                        title="AutoForm - Faculty Profile"
                        pageId="PageFacultyProfile"
                    >
                        <PageFacultyProfile />
                    </PrivateRoute>
                }
            />

            {/* Page404 Error */}
            <Route path="*" element={<Page404 pageId="Page404" />} />
        </Routes>
    );
}
