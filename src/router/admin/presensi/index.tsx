import PresensiLayout from "@/layouts/presensi-layout";
import NotFoundPage from "@/pages/not-found";
import { routesPengaturanAbsensi } from "./pengaturan-absensi.routes";
import { routesKehadiran } from "./kehadiran.routes";
import { routesRekapHarian } from "./laporan-kehadiran.routes";
import PresensiDashboardPage from "@/pages/aktor/admin/absensi/dashboard";
import { routesVisit } from "./visit.routes";
import { ErrorBoundary } from "@/pages/error";
import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";

export const routePresensi = [
	{
		path: "admin/presensi",
		element: (
			<ErrorBoundary>
				<HeaderProvider>
					<PresensiLayout />
				</HeaderProvider>
			</ErrorBoundary>
		),
		children: [
			{
				path: "",
				element: <PresensiDashboardPage />,
			},
			...routesPengaturanAbsensi,
			...routesKehadiran,
			...routesRekapHarian,
			...routesVisit,
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
