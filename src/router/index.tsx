import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "@/pages/auth/login";
import LupaPasswordPage from "@/pages/auth/lupa-password";
import NotFoundPage from "@/pages/not-found";
import MainLayout from "@/layouts/main-layout";
import DashboardPage from "@/pages/modules/portal-sekolah/dashboard";
import { ErrorBoundary } from "@/pages/error";
import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import { routePortalClient } from "./portal-client";
import ProfilePage from "@/pages/modules/portal-sekolah/profile";

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
				path: "modules",
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
