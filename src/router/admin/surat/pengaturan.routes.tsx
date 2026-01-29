import BagianSuratPage from "@/pages/aktor/admin/surat/pengaturan/bagian-surat";
import KopSuratPage from "@/pages/aktor/admin/surat/pengaturan/kop-surat";

export const routesPengaturan = [
	{
		path: "pengaturan/bagian-surat",
		element: <BagianSuratPage />,
	},
	{
		path: "pengaturan/kop-surat",
		element: <KopSuratPage />,
	},
];
