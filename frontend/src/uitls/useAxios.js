import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";

import AuthContext from "../context/AuthContext";
import { apiUrl } from "../components/providers/companyInfo";

const useAxios = () => {
	const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL: apiUrl,
		headers: {
			Authorization: `Bearer ${authTokens?.access}`,
		},
	}).access;

	axiosInstance.interceptors.response.use(async (req) => {
		const user = jwtDecode(authTokens);
		const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

		if (isExpired) return req;

		const response = await axios.post(`${apiUrl}/token/refresh/`, {
			refresh: authTokens.refresh,
		});
		localStorage.setItem("authTokens", JSON.stringify(response.data));

		setAuthTokens(response.data);
		setUser(response.data.access);

		req.headers.Authorization = `Bearer ${response.data.access}`;

		return req;
	});

	return axiosInstance;
};
