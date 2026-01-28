import DetailPrestasiPage from "@/pages/aktor/admin/website/prestasi/detail-prestasi";
import EditPrestasiPage from "@/pages/aktor/admin/website/prestasi/edit-prestasi";
import PrestasiLayout from "@/pages/aktor/admin/website/prestasi/list-prestasi/PrestasiLayout";
import PrestasiDraftPage from "@/pages/aktor/admin/website/prestasi/list-prestasi/PrestasiPage";
import PrestasiPublishedPage from "@/pages/aktor/admin/website/prestasi/list-prestasi/PublishedPage";
import TulisPrestasiPage from "@/pages/aktor/admin/website/prestasi/tulis-prestasi";
import NotFoundPage from "@/pages/not-found";

export const routesPrestasi = [
	{
		path: "prestasi",
		element: <PrestasiLayout />,
		children: [
			{
				path: "",
				element: <PrestasiPublishedPage />,
			},
			{
				path: "published",
				element: <PrestasiPublishedPage />,
			},
			{
				path: "draft",
				element: <PrestasiDraftPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "prestasi/tulis-prestasi",
		element: <TulisPrestasiPage />,
	},
	{
		path: "prestasi/:bowo/edit",
		element: <EditPrestasiPage />,
	},

	{
		path: "prestasi/:bowo/detail",
		element: <DetailPrestasiPage />,
	},
];
