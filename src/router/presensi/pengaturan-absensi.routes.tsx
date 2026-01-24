import HariLiburPage from "@/pages/modules/absensi/pengaturan-absensi/hari-libur";
import PeriodeCutiPage from "@/pages/modules/absensi/pengaturan-absensi/periode-cuti";
import TambahPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/buat-permohonan-cuti";
import DetailPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti";
import PermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/layout/CutiPage";
import EditPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/ubah-permohonan-cuti";
import StatusAbsenPage from "@/pages/modules/absensi/pengaturan-absensi/set-status-absen-perangkat";

export const routesPengaturanAbsensi = [
	{
		path: "pengaturan-absensi/periode-cuti",
		element: <PeriodeCutiPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/cuti",
		element: <PermohonanCutiPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/cuti/tambah-cuti",
		element: <TambahPermohonanCutiPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/cuti/:bowo/edit",
		element: <EditPermohonanCutiPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/cuti/:bowo/detail",
		element: <DetailPermohonanCutiPage />,
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
