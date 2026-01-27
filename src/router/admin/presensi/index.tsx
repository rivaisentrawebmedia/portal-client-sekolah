import PresensiLayout from "@/layouts/presensi-layout";
import NotFoundPage from "@/pages/not-found";
import { routesPengaturanAbsensi } from "./pengaturan-absensi.routes";
import { routesKehadiran } from "./kehadiran.routes";
import { routesRekapHarian } from "./laporan-kehadiran.routes";
import PresensiDashboardPage from "@/pages/aktor/admin/absensi/dashboard";
import { routesVisit } from "./visit.routes";

export const routePresensi = [
	{
		path: "admin/presensi",
		element: <PresensiLayout />,
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
