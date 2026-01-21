import ProfilOrganisasiLayout from "@/pages/modules/portal-sekolah/profil-organisasi";
import GaleriOrgnisasiPage from "@/pages/modules/portal-sekolah/profil-organisasi/galeri";
import ProfilOrgasasiPage from "@/pages/modules/portal-sekolah/profil-organisasi/profil";
import VisiMisiOrgasasiPage from "@/pages/modules/portal-sekolah/profil-organisasi/visi-misi";
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
