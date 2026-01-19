// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute() {
	const token = Cookies.get("token");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
