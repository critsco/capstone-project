import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "../assets/scss/app.scss";
import RouteList from "./RouteList";
import { AuthProvider } from "../../context/AuthContext";

const queryClient = new QueryClient();

export default function Routers() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<AuthProvider>
					<RouteList />
				</AuthProvider>
			</Router>
		</QueryClientProvider>
	);
}
