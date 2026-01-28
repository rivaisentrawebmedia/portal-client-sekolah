import DetailMadingPage from "@/pages/aktor/admin/website/mading/detail-mading";
import EditMadingPage from "@/pages/aktor/admin/website/mading/edit-mading";
import MadingLayout from "@/pages/aktor/admin/website/mading/list-mading/MadingLayout";
import MadingDraftPage from "@/pages/aktor/admin/website/mading/list-mading/DraftPage";
import MadingPublishedPage from "@/pages/aktor/admin/website/mading/list-mading/PublishedPage";
import TulisMadingPage from "@/pages/aktor/admin/website/mading/tulis-mading";
import NotFoundPage from "@/pages/not-found";

export const routesMading = [
	{
		path: "mading",
		element: <MadingLayout />,
		children: [
			{
				path: "",
				element: <MadingPublishedPage />,
			},
			{
				path: "published",
				element: <MadingPublishedPage />,
			},
			{
				path: "draft",
				element: <MadingDraftPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "mading/tulis-mading",
		element: <TulisMadingPage />,
	},
	{
		path: "mading/:bowo/edit",
		element: <EditMadingPage />,
	},

	{
		path: "mading/:bowo/detail",
		element: <DetailMadingPage />,
	},
];
