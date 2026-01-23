import HariLiburPage from "@/pages/modules/absensi/pengaturan-absensi/hari-libur";
import PeriodeCutiPage from "@/pages/modules/absensi/pengaturan-absensi/periode-cuti";

export const routesPengaturanAbsensi = [
	{
		path: "pengaturan-absensi/periode-cuti",
		element: <PeriodeCutiPage />,
	},
	{
		path: "pengaturan-absensi/hari-libur",
		element: <HariLiburPage />,
	},
];
