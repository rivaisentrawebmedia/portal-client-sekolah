import StrukturOrganisasiPage from "@/pages/modules/portal-sekolah/strukttur-organisasi";
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
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
