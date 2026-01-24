import HariLiburPage from "@/pages/modules/absensi/pengaturan-absensi/hari-libur";
import MonitoringCutiPage from "@/pages/modules/absensi/pengaturan-absensi/monitoring-cuti/list-monitoring-cuti";
import PeriodeCutiPage from "@/pages/modules/absensi/pengaturan-absensi/periode-cuti";
import TambahPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/buat-permohonan-cuti";
import DetailPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti";
import PermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/layout/CutiPage";
import EditPermohonanCutiPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/cuti/ubah-permohonan-cuti";
import TambahPermohonanIzinPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/izin/buat-permohonan-izin";
import DetailPermohonanIzinPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/izin/detail-permohonan-izin";
import PermohonanIzinPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/izin/list-permohonan-izin/IzinPage";
import EditPermohonanIzinPage from "@/pages/modules/absensi/pengaturan-absensi/permohonan-validasi/izin/ubah-permohonan-izin";
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
		path: "pengaturan-absensi/permohonan-validasi/izin",
		element: <PermohonanIzinPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/izin/tambah-izin",
		element: <TambahPermohonanIzinPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/izin/:bowo/edit",
		element: <EditPermohonanIzinPage />,
	},
	{
		path: "pengaturan-absensi/permohonan-validasi/izin/:bowo/detail",
		element: <DetailPermohonanIzinPage />,
	},
	{
		path: "pengaturan-absensi/set-status-absen-perangkat",
		element: <StatusAbsenPage />,
	},
	{
		path: "pengaturan-absensi/monitoring-sisa-cuti",
		element: <MonitoringCutiPage />,
	},
	{
		path: "pengaturan-absensi/hari-libur",
		element: <HariLiburPage />,
	},
];
