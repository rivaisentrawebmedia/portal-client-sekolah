import VisitDetailPage from "@/pages/aktor/admin/absensi/visit/detail-visit";
import VisitPage from "@/pages/aktor/admin/absensi/visit/list-visit";
import RekapVisitDetailPage from "@/pages/aktor/admin/absensi/visit/rekap-visit-pegawai";

export const routesVisit = [
	{
		path: "visit",
		element: <VisitPage />,
	},
	{
		path: "visit/:bowo/rekap-pegawai",
		element: <RekapVisitDetailPage />,
	},

	{
		path: "visit/:bowo/detail",
		element: <VisitDetailPage />,
	},
];
