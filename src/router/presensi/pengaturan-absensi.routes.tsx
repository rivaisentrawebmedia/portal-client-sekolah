import HariLiburPage from "@/pages/modules/absensi/pengaturan-absensi/hari-libur";
import PeriodeCutiPage from "@/pages/modules/absensi/pengaturan-absensi/periode-cuti";
import StatusAbsenPage from "@/pages/modules/absensi/pengaturan-absensi/set-status-absen-perangkat";

export const routesPengaturanAbsensi = [
	{
		path: "pengaturan-absensi/periode-cuti",
		element: <PeriodeCutiPage />,
	},
	{
		path: "pengaturan-absensi/set-status-absen-perangkat",
		element: <StatusAbsenPage />,
	},
	{
		path: "pengaturan-absensi/hari-libur",
		element: <HariLiburPage />,
	},
];
