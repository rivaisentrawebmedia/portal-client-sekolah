import ProfilOrganisasiLayout from "@/pages/aktor/admin/portal-admin/profil-organisasi";
import GaleriOrgnisasiPage from "@/pages/aktor/admin/portal-admin/profil-organisasi/galeri";
import ProfilOrgasasiPage from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil";
import VisiMisiOrgasasiPage from "@/pages/aktor/admin/portal-admin/profil-organisasi/visi-misi";
import NotFoundPage from "@/pages/not-found";

export const routesProfilOrganisasi = [
	{
		path: "profil-organisasi",
		element: <ProfilOrganisasiLayout />,
		children: [
			{
				path: "",
				element: <ProfilOrgasasiPage />,
			},

			{
				path: "visi-misi-tujuan",
				element: <VisiMisiOrgasasiPage />,
			},

			{
				path: "galeri",
				element: <GaleriOrgnisasiPage />,
			},

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
