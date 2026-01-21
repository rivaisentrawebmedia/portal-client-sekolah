import { routesManajemenUser } from "./manajemen-user.routes";
import { routesStrukturOrganisasi } from "./struktur-organisasi.routes";

export const routePortalClient = [
	...routesManajemenUser,

	...routesStrukturOrganisasi,
];
