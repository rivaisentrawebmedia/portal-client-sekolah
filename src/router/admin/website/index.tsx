import { HeaderProvider } from "@/layouts/main-layout/hooks/headerContext";
import WebsiteLayout from "@/layouts/website-layout";
import WebsiteDashboardPage from "@/pages/aktor/admin/website/dashboard";
import { ErrorBoundary } from "@/pages/error";
import NotFoundPage from "@/pages/not-found";
import { routesBerita } from "./berita.routes";
import { routesMading } from "./mading.routes";
import { routesPengumuman } from "./pengumuman.routes";
import { routesPrestasi } from "./prestasi.routes";
import { routesAgenda } from "./agenda.routes";
import { routesProfilSekolah } from "./profil-sekolah.routes";

export const routewebsite = [
	{
		path: "admin/website",
		element: (
			<ErrorBoundary>
				<HeaderProvider>
					<WebsiteLayout />
				</HeaderProvider>
			</ErrorBoundary>
		),
		children: [
			{
				path: "",
				element: <WebsiteDashboardPage />,
			},

			...routesProfilSekolah,

			...routesBerita,

			...routesMading,

			...routesPengumuman,

			...routesPrestasi,

			...routesAgenda,

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
