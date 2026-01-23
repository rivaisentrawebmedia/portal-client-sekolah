import PresensiLayout from "@/layouts/presensi-layout";
import NotFoundPage from "@/pages/not-found";

export const routePresensi = [
	{
		path: "modules/presensi",
		element: <PresensiLayout />,
		children: [
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
