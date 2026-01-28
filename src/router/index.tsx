import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "@/pages/auth/login";
import LupaPasswordPage from "@/pages/auth/lupa-password";
import NotFoundPage from "@/pages/not-found";
import MainLayout from "@/layouts/main-layout";
import { ErrorBoundary } from "@/pages/error";
import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import { routePortalClient } from "./admin/portal-client";
import { routePresensi } from "./admin/presensi";
import DashboardPage from "@/pages/aktor/admin/portal-admin/dashboard";
import ProfilePage from "@/pages/aktor/admin/portal-admin/profile";
import { routewebsite } from "./admin/website";
import { routePerjalananDinas } from "./admin/perjalanan-dinas";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" replace />,
	},
	{
		element: <PublicRoute />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "forget-password",
				element: <LupaPasswordPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				path: "admin",
				element: (
					<ErrorBoundary>
						<HeaderProvider>
							<MainLayout />
						</HeaderProvider>
					</ErrorBoundary>
				),
				children: [
					{ path: "", element: <DashboardPage /> },
					{ path: "dashboard", element: <DashboardPage /> },
					{ path: "profile", element: <ProfilePage /> },

					...routePortalClient,
					{
						path: "*",
						element: <NotFoundPage />,
					},
				],
			},

			...routePresensi,

			...routewebsite,

			...routePerjalananDinas,

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
