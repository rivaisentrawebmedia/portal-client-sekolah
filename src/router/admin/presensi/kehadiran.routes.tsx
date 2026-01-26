import DaftarPegawaiKegiatanHarianPage from "@/pages/aktor/admin/absensi/kehadiran/kegiatan-harian/daftar-pegawai";
import KegiatanHarianPage from "@/pages/aktor/admin/absensi/kehadiran/kegiatan-harian/list-kegiatan-harian";
import DaftarPegawaiPageRiwayatKehadiran from "@/pages/aktor/admin/absensi/kehadiran/riwayat/daftar-pegawai";
import RiwayatKehadiranPage from "@/pages/aktor/admin/absensi/kehadiran/riwayat/detail-riwayat-kehadiran";
import RiwayatKehadiranPerBulanPage from "@/pages/aktor/admin/absensi/kehadiran/riwayat/riwayat-kehadiran-per-bulan";

export const routesKehadiran = [
	{
		path: "kehadiran/riwayat-kehadiran",
		element: <DaftarPegawaiPageRiwayatKehadiran />,
	},
	{
		path: "kehadiran/riwayat-kehadiran/:bowo/riwayat-kehadiran",
		element: <RiwayatKehadiranPage />,
	},
	{
		path: "kehadiran/riwayat-kehadiran/:bowo/riwayat-kehadiran/:owi/riwayat-kehadiran-perbulan",
		element: <RiwayatKehadiranPerBulanPage />,
	},
	{
		path: "kehadiran/kegiatan-harian",
		element: <DaftarPegawaiKegiatanHarianPage />,
	},
	{
		path: "kehadiran/kegiatan-harian/:bowo/kegiatan-harian",
		element: <KegiatanHarianPage />,
	},
];
