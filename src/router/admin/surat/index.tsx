import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import SuratLayout from "@/layouts/surat";
import { ErrorBoundary } from "@/pages/error";
import NotFoundPage from "@/pages/not-found";
import { routesPengaturan } from "./pengaturan.routes";

export const routeSurat = [
	{
		path: "admin/surat",
		element: (
			<ErrorBoundary>
				<HeaderProvider>
					<SuratLayout />
				</HeaderProvider>
			</ErrorBoundary>
		),
		children: [
			{
				path: "",
				element: <p>Dashboard</p>,
			},

			...routesPengaturan,

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
