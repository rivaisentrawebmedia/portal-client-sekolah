import DetailAgendaPage from "@/pages/aktor/admin/website/agenda/detail-agenda";
import EditAgendaPage from "@/pages/aktor/admin/website/agenda/edit-agenda";
import AgendaLayout from "@/pages/aktor/admin/website/agenda/list-agenda/AgendaLayout";
import AgendaDraftPage from "@/pages/aktor/admin/website/agenda/list-agenda/DraftPage";
import AgendaPublishedPage from "@/pages/aktor/admin/website/agenda/list-agenda/PublishedPage";
import TulisAgendaPage from "@/pages/aktor/admin/website/agenda/tulis-agenda";
import NotFoundPage from "@/pages/not-found";

export const routesAgenda = [
	{
		path: "agenda",
		element: <AgendaLayout />,
		children: [
			{
				path: "",
				element: <AgendaPublishedPage />,
			},
			{
				path: "published",
				element: <AgendaPublishedPage />,
			},
			{
				path: "draft",
				element: <AgendaDraftPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "agenda/tulis-agenda",
		element: <TulisAgendaPage />,
	},
	{
		path: "agenda/:bowo/edit",
		element: <EditAgendaPage />,
	},

	{
		path: "agenda/:bowo/detail",
		element: <DetailAgendaPage />,
	},
];
