import DetailBeritaPage from "@/pages/aktor/admin/website/berita/detail-berita";
import EditBeritaPage from "@/pages/aktor/admin/website/berita/edit-berita";
import BeritaLayout from "@/pages/aktor/admin/website/berita/list-berita/BeritaLayout";
import BeritaDashboardPage from "@/pages/aktor/admin/website/berita/list-berita/DashboardPage";
import BeritaDraftPage from "@/pages/aktor/admin/website/berita/list-berita/DraftPage";
import BeritaPublishedPage from "@/pages/aktor/admin/website/berita/list-berita/PublishedPage";
import TulisBeritaPage from "@/pages/aktor/admin/website/berita/tulis-berita";
import NotFoundPage from "@/pages/not-found";

export const routesBerita = [
	{
		path: "berita",
		element: <BeritaLayout />,
		children: [
			{
				path: "",
				element: <BeritaDashboardPage />,
			},
			{
				path: "published",
				element: <BeritaPublishedPage />,
			},
			{
				path: "draft",
				element: <BeritaDraftPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "berita/tulis-berita",
		element: <TulisBeritaPage />,
	},
	{
		path: "berita/:bowo/edit",
		element: <EditBeritaPage />,
	},

	{
		path: "berita/:bowo/detail",
		element: <DetailBeritaPage />,
	},
];
