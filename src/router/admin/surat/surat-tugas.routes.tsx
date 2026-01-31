import AnggaranPage from "@/pages/aktor/admin/surat/perjalanan-dinas/anggaran";
import DokumentasiSPPDPage from "@/pages/aktor/admin/surat/perjalanan-dinas/dokumentasi";
import JenisBiayaPage from "@/pages/aktor/admin/surat/perjalanan-dinas/jenis-biaya";
import DetailLaporanSPPDPage from "@/pages/aktor/admin/surat/perjalanan-dinas/laporan";
import DetailListLumpsumPage from "@/pages/aktor/admin/surat/perjalanan-dinas/lumpsum/DetailLumpsum";
import UbahListLumpsumPage from "@/pages/aktor/admin/surat/perjalanan-dinas/lumpsum/EditLumpsum";
import ListLumpsumPage from "@/pages/aktor/admin/surat/perjalanan-dinas/lumpsum/listLumpsum";
import EditSPPDPage from "@/pages/aktor/admin/surat/perjalanan-dinas/sppd/edit-sppd";
import BuatSPPDPage from "@/pages/aktor/admin/surat/perjalanan-dinas/sppd/tulis-sppd";
import BuatSuratTugasPage from "@/pages/aktor/admin/surat/perjalanan-dinas/surat-tugas/buat-surat-tugas";
import DetailSuratTugasPage from "@/pages/aktor/admin/surat/perjalanan-dinas/surat-tugas/detail-surat-tugas";
import EditSuratTugasPage from "@/pages/aktor/admin/surat/perjalanan-dinas/surat-tugas/edit-surat-tugas";
import SuratTugasPage from "@/pages/aktor/admin/surat/perjalanan-dinas/surat-tugas/list-surat-tugas";

export const routesSuratTugas = [
	{
		path: "perjalanan-dinas/surat-tugas-spd",
		element: <SuratTugasPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/tambah",
		element: <BuatSuratTugasPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/edit",
		element: <EditSuratTugasPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail",
		element: <DetailSuratTugasPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/tambah",
		element: <BuatSPPDPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/edit",
		element: <EditSPPDPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/laporan",
		element: <DetailLaporanSPPDPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/lumpsum",
		element: <ListLumpsumPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/dokumentasi",
		element: <DokumentasiSPPDPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/lumpsum/:owi/detail-lumpsum",
		element: <DetailListLumpsumPage />,
	},
	{
		path: "perjalanan-dinas/surat-tugas-spd/:bowo/detail/lumpsum/:owi/detail-lumpsum/ubah",
		element: <UbahListLumpsumPage />,
	},
	{
		path: "perjalanan-dinas/anggaran",
		element: <AnggaranPage />,
	},
	{
		path: "perjalanan-dinas/jenis-biaya",
		element: <JenisBiayaPage />,
	},
];
