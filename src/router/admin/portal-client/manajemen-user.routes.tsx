import EditUserPage from "@/pages/aktor/admin/portal-admin/manajemen-user/edit-user";
import EditInformasiAkunPage from "@/pages/aktor/admin/portal-admin/manajemen-user/edit-user/info-akun";
import ManajemenUserPage from "@/pages/aktor/admin/portal-admin/manajemen-user/list-user";
import RiwayatAktivitasPage from "@/pages/aktor/admin/portal-admin/manajemen-user/riwayat-aktivitas";
import TambahUserPage from "@/pages/aktor/admin/portal-admin/manajemen-user/tambah-user";
import TambahInformasiAkunPage from "@/pages/aktor/admin/portal-admin/manajemen-user/tambah-user/info-akun";
import KontrolAksesPage from "@/pages/aktor/admin/portal-admin/manajemen-user/tambah-user/kontrol-akses";
import NotFoundPage from "@/pages/not-found";

export const routesManajemenUser = [
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
	{
		path: "manajemen-user/detail-user",
		element: <RiwayatAktivitasPage />,
	},
];
