import { Route, Routes } from "react-router-dom";

import { userData } from "../providers/companyInfo";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page403 from "../views/errors/Page403";
import Page404 from "../views/errors/Page404";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageCalendar from "../views/private/PageCalendar/PageCalendar";
import PageCalendarArchive from "../views/private/PageCalendar/pages/PageCalendarArchive/PageCalendarArchive";
import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageDocuments from "../views/private/PageDocuments/PageDocuments";
import PageInternStatus from "../views/private/PageInternStatus/PageInternStatus";
import PageProfile from "../views/private/PageProfile/PageProfile";
import PageCompanies from "../views/private/PageCompanies/PageCompanies";
import PageCompanyArchive from "../views/private/PageCompanies/pages/PageCompanyArchive/PageCompanyArchive";

export default function RouteList() {
    const userdata = userData();

    const userRoleId = userdata?.user_role_id || null;

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/"
                element={
                    <PublicRoute title="AutoForm | Login" pageId="PageLogin">
                        <PageLogin />
                    </PublicRoute>
                }
            />

            {/* Private Routes */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute
                        title="AutoForm | Profile"
                        pageId="PageProfile"
                        component={PageProfile}
                    />
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        title="AutoForm | Dashboard"
                        pageId="PageDashboard"
                        component={PageDashboard}
                    />
                }
            />
            <Route
                path="/documents"
                element={
                    <PrivateRoute
                        title="AutoForm | Documents"
                        pageId="PageDocuments"
                        component={PageDocuments}
                    />
                }
            />
            {userRoleId === 1 ? (
                <>
                    <Route
                        path="/intern-status"
                        element={
                            <PrivateRoute
                                title="AutoForm | Intern Status"
                                pageId="PageInternStatus"
                                component={PageInternStatus}
                            />
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            <PrivateRoute
                                title="AutoForm | Calendar"
                                pageId="PageCalendar"
                                component={PageCalendar}
                            />
                        }
                    />
                    <Route
                        path="/calendar/archive"
                        element={
                            <PrivateRoute
                                title="AutoForm | Calendar"
                                pageId="PageCalendarArchive"
                                component={PageCalendarArchive}
                            />
                        }
                    />
                    <Route
                        path="/companies"
                        element={
                            <PrivateRoute
                                title="AutoForm | Companies"
                                pageId="PageCompanies"
                                component={PageCompanies}
                            />
                        }
                    />
                    <Route
                        path="/companies/archive"
                        element={
                            <PrivateRoute
                                title="AutoForm | Company Archive"
                                pageId="PageCompanyArchive"
                                component={PageCompanyArchive}
                            />
                        }
                    />
                </>
            ) : (
                <>
                    <Route
                        path="/intern-status"
                        element={<Page403 pageId="Page403" />}
                    />
                    <Route
                        path="/calendar"
                        element={<Page403 pageId="Page403" />}
                    />
                    <Route
                        path="/companies"
                        element={<Page403 pageId="Page403" />}
                    />
                    <Route
                        path="/companies/archive"
                        element={<Page403 pageId="Page403" />}
                    />
                </>
            )}

            {/* Page404 Error */}
            <Route path="*" element={<Page404 pageId="Page404" />} />
        </Routes>
    );
}
