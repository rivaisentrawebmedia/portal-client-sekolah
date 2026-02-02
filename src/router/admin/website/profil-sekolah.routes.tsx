import TentangSekolahPage from "@/pages/aktor/admin/website/profil-sekolah/tentang-sekolah";
import EditTentangSekolah from "@/pages/aktor/admin/website/profil-sekolah/tentang-sekolah/EditTentangSekolah";

export const routesProfilSekolah = [
	{
		path: "profil-sekolah/tentang-sekolah",
		element: <TentangSekolahPage />,
	},
	{
		path: "profil-sekolah/tentang-sekolah/edit",
		element: <EditTentangSekolah />,
	},
];
