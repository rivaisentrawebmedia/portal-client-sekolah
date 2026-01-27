import DaftarPegawaiRekapBulananPage from "@/pages/aktor/admin/absensi/laporan-kehadiran/rekap-bulanan/daftar-pegawai";
import RekapBulananDetailPage from "@/pages/aktor/admin/absensi/laporan-kehadiran/rekap-bulanan/rekap-bulanan-detail";
import RekapHarianPage from "@/pages/aktor/admin/absensi/laporan-kehadiran/rekap-harian";

export const routesRekapHarian = [
	{
		path: "laporan-kehadiran/rekap-harian",
		element: <RekapHarianPage />,
	},
	{
		path: "laporan-kehadiran/rekap-bulanan",
		element: <DaftarPegawaiRekapBulananPage />,
	},

	{
		path: "laporan-kehadiran/rekap-bulanan/:bowo/rekap-bulanan",
		element: <RekapBulananDetailPage />,
	},
];
