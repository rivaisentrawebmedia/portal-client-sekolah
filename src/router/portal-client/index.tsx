import LogAktivitasPage from "@/pages/modules/portal-sekolah/log-aktivitas";
import { routesManajemenUser } from "./manajemen-user.routes";
import { routesStrukturOrganisasi } from "./struktur-organisasi.routes";

export const routePortalClient = [
	...routesManajemenUser,

	...routesStrukturOrganisasi,

	{
		path: "log-aktivitas",
		element: <LogAktivitasPage />,
	},
];
