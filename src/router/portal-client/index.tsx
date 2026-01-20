import EditUserPage from "@/pages/modules/portal-sekolah/manajemen-user/edit-user";
import EditInformasiAkunPage from "@/pages/modules/portal-sekolah/manajemen-user/edit-user/info-akun";
import ManajemenUserPage from "@/pages/modules/portal-sekolah/manajemen-user/list-user";
import TambahUserPage from "@/pages/modules/portal-sekolah/manajemen-user/tambah-user";
import TambahInformasiAkunPage from "@/pages/modules/portal-sekolah/manajemen-user/tambah-user/info-akun";
import KontrolAksesPage from "@/pages/modules/portal-sekolah/manajemen-user/tambah-user/kontrol-akses";
import NotFoundPage from "@/pages/not-found";

export const routePortalClient = [
	{
		path: "manajemen-user",
		element: <ManajemenUserPage />,
	},
	{
		path: "manajemen-user/tambah-user",
		element: <TambahUserPage />,
		children: [
			{
				path: "",
				element: <TambahInformasiAkunPage />,
			},
			{
				path: "kontrol-akses",
				element: <KontrolAksesPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "manajemen-user/edit-user",
		element: <EditUserPage />,
		children: [
			{
				path: "",
				element: <EditInformasiAkunPage />,
			},
			{
				path: "kontrol-akses",
				element: <KontrolAksesPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
