import { routesManajemenUser } from "./manajemen-user.routes";
import { routesStrukturOrganisasi } from "./struktur-organisasi.routes";
import { routesProfilOrganisasi } from "./profil-organisasi.routes";
import LogAktivitasPage from "@/pages/aktor/admin/portal-admin/log-aktivitas";

export const routePortalClient = [
	...routesManajemenUser,

	...routesStrukturOrganisasi,

	{
		path: "log-aktivitas",
		element: <LogAktivitasPage />,
	},

	...routesProfilOrganisasi,
];
