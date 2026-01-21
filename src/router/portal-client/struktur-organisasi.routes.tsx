import StrukturOrganisasiPage from "@/pages/modules/portal-sekolah/strukttur-organisasi";
import JabatanPage from "@/pages/modules/portal-sekolah/strukttur-organisasi/jabatan";
import RiwayatJabatanPage from "@/pages/modules/portal-sekolah/strukttur-organisasi/jabatan/RiwayatPejabat";
import KelompokPage from "@/pages/modules/portal-sekolah/strukttur-organisasi/kelompok";
import NotFoundPage from "@/pages/not-found";

export const routesStrukturOrganisasi = [
	{
		path: "struktur-organisasi",
		element: <StrukturOrganisasiPage />,
		children: [
			{
				path: "",
				element: <KelompokPage />,
			},
			{
				path: "jabatan",
				element: <JabatanPage />,
			},

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "struktur-organisasi/jabatan/:bowo/riwayat-pejabat",
		element: <RiwayatJabatanPage />,
	},
];
