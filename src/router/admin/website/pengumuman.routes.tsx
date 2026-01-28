import DetailPengumumanPage from "@/pages/aktor/admin/website/pengumuman/detail-pengumuman";
import EditPengumumanPage from "@/pages/aktor/admin/website/pengumuman/edit-pengumuman";
import PengumumanLayout from "@/pages/aktor/admin/website/pengumuman/list-pengumuman/PengumumanLayout";
import PengumumanDraftPage from "@/pages/aktor/admin/website/pengumuman/list-pengumuman/DraftPage";
import PengumumanPublishedPage from "@/pages/aktor/admin/website/pengumuman/list-pengumuman/PublishedPage";
import TulisPengumumanPage from "@/pages/aktor/admin/website/pengumuman/tulis-pengumuman";
import NotFoundPage from "@/pages/not-found";

export const routesPengumuman = [
	{
		path: "pengumuman",
		element: <PengumumanLayout />,
		children: [
			{
				path: "",
				element: <PengumumanPublishedPage />,
			},
			{
				path: "published",
				element: <PengumumanPublishedPage />,
			},
			{
				path: "draft",
				element: <PengumumanDraftPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "pengumuman/tulis-pengumuman",
		element: <TulisPengumumanPage />,
	},
	{
		path: "pengumuman/:bowo/edit",
		element: <EditPengumumanPage />,
	},

	{
		path: "pengumuman/:bowo/detail",
		element: <DetailPengumumanPage />,
	},
];
