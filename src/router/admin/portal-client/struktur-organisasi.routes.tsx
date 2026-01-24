import StrukturOrganisasiPage from "@/pages/aktor/admin/portal-admin/strukttur-organisasi";
import JabatanPage from "@/pages/aktor/admin/portal-admin/strukttur-organisasi/jabatan";
import RiwayatJabatanPage from "@/pages/aktor/admin/portal-admin/strukttur-organisasi/jabatan/RiwayatPejabat";
import KelompokPage from "@/pages/aktor/admin/portal-admin/strukttur-organisasi/kelompok";
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
