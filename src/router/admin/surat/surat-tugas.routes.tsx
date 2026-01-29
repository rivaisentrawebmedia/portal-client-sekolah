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
];
