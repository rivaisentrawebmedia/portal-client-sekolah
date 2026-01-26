import PresensiLayout from "@/layouts/presensi-layout";
import NotFoundPage from "@/pages/not-found";
import { routesPengaturanAbsensi } from "./pengaturan-absensi.routes";
import { routesKehadiran } from "./kehadiran.routes";
import { routesRekapHarian } from "./laporan-kehadiran.routes";

export const routePresensi = [
	{
		path: "admin/presensi",
		element: <PresensiLayout />,
		children: [
			...routesPengaturanAbsensi,
			...routesKehadiran,
			...routesRekapHarian,
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
