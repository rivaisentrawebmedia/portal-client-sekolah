import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import PerjalananDInasLayout from "@/layouts/perjalanan-dinas-layout";
import { ErrorBoundary } from "@/pages/error";
import NotFoundPage from "@/pages/not-found";

export const routePerjalananDinas = [
	{
		path: "admin/perjalanan-dinas",
		element: (
			<ErrorBoundary>
				<HeaderProvider>
					<PerjalananDInasLayout />
				</HeaderProvider>
			</ErrorBoundary>
		),
		children: [
			{
				path: "",
				element: <p>lorem</p>,
			},

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
