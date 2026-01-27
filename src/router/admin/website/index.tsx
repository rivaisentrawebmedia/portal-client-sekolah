import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import WebsiteLayout from "@/layouts/website-layout";
import { ErrorBoundary } from "@/pages/error";
import NotFoundPage from "@/pages/not-found";

export const routewebsite = [
	{
		path: "admin/website",
		element: (
			<ErrorBoundary>
				<HeaderProvider>
					<WebsiteLayout />
				</HeaderProvider>
			</ErrorBoundary>
		),
		children: [
			{
				parh: "",
				element: <p></p>,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
