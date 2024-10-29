import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { notification } from "antd";
// import dayjs from "dayjs";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);

	const [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwtDecode(localStorage.getItem("authTokens"))
			: null
	);

	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const openNotification = (type, message, description) => {
		notification[type]({
			message,
			description,
			placement: "topRight",
			duration: 5,
		});
	};

	// const checkAuthStatus = async () => {
	// 	const authTokens = localStorage.getItem("authTokens");

	// 	if (!authTokens) return false;

	// 	const decodedToken = jwtDecode(authTokens);
	// 	const isExpired = dayjs.unix(decodedToken.exp).isBefore(dayjs());

	// 	return !isExpired;
	// };

	const loginUser = async (email, password, expectedRole) => {
		try {
			const response = await fetch("http://localhost:8000/api/token/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data);
				const decodedUser = jwtDecode(data.access);
				setUser(decodedUser);
				localStorage.setItem("authTokens", JSON.stringify(data));

				if (decodedUser.user_role !== expectedRole) {
					notification.error({
						message: "Access Denied",
						description: `Please use the ${
							expectedRole === 1 ? "Faculty" : "Student"
						} login.`,
					});

					return;
				}

				navigate(
					decodedUser.user_role === 1 ? "/faculty/dashboard" : "/dashboard"
				);

				openNotification(
					"success",
					"Login Successful",
					"You are now logged in!"
				);
			} else {
				throw new Error("Invalid email or password.");
			}
		} catch (error) {
			openNotification("error", "Login Failed", error.message);
		}
	};

	const registerUser = async (
		email,
		password,
		password2,
		user_role,
		profileData,
		rolePath
	) => {
		try {
			const response = await fetch("http://localhost:8000/api/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					password2,
					user_role,
					profile: profileData,
				}),
			});

			if (response.status === 201) {
				navigate(rolePath); // Navigate based on user role path
				openNotification(
					"success",
					"Registration Successful",
					"You have been registered."
				);
			} else {
				throw new Error(`Registration failed with status ${response.status}`);
			}
		} catch (error) {
			openNotification("error", "Registration Failed", error.message);
		}
	};

	// Usage example
	const registerFaculty = (email, password, password2, profileData) =>
		registerUser(email, password, password2, 1, profileData, "/faculty");

	const registerStudent = (email, password, password2, profileData) =>
		registerUser(email, password, password2, 2, profileData, "/");

	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/");

		openNotification(
			"success",
			"Logout Successful",
			"You have been logged out."
		);
	};

	useEffect(() => {
		if (authTokens) {
			setUser(jwtDecode(authTokens.access));
		}
		setLoading(false);
	}, [authTokens, loading]);

	const contextData = {
		user,
		setUser,
		authTokens,
		setAuthTokens,
		loginUser,
		registerFaculty,
		registerStudent,
		logoutUser,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
