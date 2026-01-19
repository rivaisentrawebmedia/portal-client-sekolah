// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PublicRoute() {
	const token = Cookies.get("token");

	if (token) {
		return <Navigate to="/modules/dashboard" replace />;
	}

	return <Outlet />;
}
