import {
	DashboardBeritaTerbaru,
	DashboardBeritaTerpopuler,
	DashboardStats,
} from "./components";

export default function BeritaDashboardPage() {
	return (
		<>
			<div className="flex flex-col gap-4">
				<DashboardStats />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<DashboardBeritaTerbaru />
					<DashboardBeritaTerpopuler />
				</div>
			</div>
		</>
	);
}
