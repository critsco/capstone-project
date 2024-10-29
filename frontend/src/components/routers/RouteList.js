import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Page404 from "../views/errors/Page404";

import PageStudentLogin from "../views/public/Student/PageStudentLogin";
import PageFacultyLogin from "../views/public/Faculty/PageFacultyLogin";

import PageFacultyDashboard from "../views/private/Faculty/PageFacultyDashboard/PageFacultyDashboard";
import PageStudentDashboard from "../views/private/Student/PageStudentDashboard/PageStudentDashboard";

// import PageDashboard from "../views/private/PageDashboard/PageDashboard";

export default function RouteList() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute
						title="AutoForm - Student Login"
						pageId="PageStudentLogin"
						component={PageStudentLogin}
					/>
				}
			/>
			<Route
				path="/faculty"
				element={
					<PublicRoute
						title="AutoForm - Faculty Login"
						pageId="PageFacultyLogin"
						component={PageFacultyLogin}
					/>
				}
			/>

			{/* Faculty */}
			<Route
				path="/faculty/dashboard"
				element={
					<PrivateRoute
						moduleName="Dashboard"
						title="FSUU Scholarship Portal - Dashboard"
						pageId="PageFacultyDashboard"
						allowedRoles={[1]}
						component={PageFacultyDashboard}
					/>
				}
			/>

			{/* Student */}
			<Route
				path="/dashboard"
				element={
					<PrivateRoute
						moduleName="Dashboard"
						title="FSUU Scholarship Portal - Dashboard"
						pageId="PageDashboard"
						allowedRoles={[2]}
						component={PageStudentDashboard}
					/>
				}
			/>

			<Route path="*" element={<Page404 pageId="Page404" />} />
		</Routes>
	);
}
