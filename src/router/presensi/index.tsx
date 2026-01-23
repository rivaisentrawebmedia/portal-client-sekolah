import PresensiLayout from "@/layouts/presensi-layout";
import NotFoundPage from "@/pages/not-found";
import { routesPengaturanAbsensi } from "./pengaturan-absensi.routes";

export const routePresensi = [
	{
		path: "modules/presensi",
		element: <PresensiLayout />,
		children: [
			...routesPengaturanAbsensi,
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
