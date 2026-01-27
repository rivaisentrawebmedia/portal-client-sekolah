import { Button } from "@/components/ui/button";
import { FaChartBar } from "react-icons/fa";
import { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { ChartRiwayatKehadiran } from "../../detail-riwayat-kehadiran/model";

export function ButtonChartRiwayatKehadiran({
	dataChart,
	loading,
	bulan,
	tahun,
}: {
	dataChart: ChartRiwayatKehadiran | undefined;
	loading: boolean;
	bulan: string;
	tahun: string;
}) {
	const [isShow, setIsShow] = useState(false);

	const chartData = useMemo(
		() => [
			{ label: "Hari Kerja", value: dataChart?.hari_kerja ?? 0 },
			{ label: "Hadir", value: dataChart?.hadir ?? 0 },
			{ label: "Hadir Libur", value: dataChart?.hadir_libur ?? 0 },
			{ label: "Terlambat", value: dataChart?.terlambat ?? 0 },
			{ label: "Pulang Cepat", value: dataChart?.pulang_awal ?? 0 },
			{ label: "Sakit", value: dataChart?.sakit ?? 0 },
			{ label: "Izin", value: dataChart?.izin ?? 0 },
			{ label: "Alfa", value: dataChart?.alpha ?? 0 },
			{ label: "Cuti", value: dataChart?.cuti ?? 0 },
		],
		[dataChart],
	);

	return (
		<>
			<Button
				type="button"
				disabled={loading}
				onClick={() => setIsShow(true)}
				variant="outline"
				className="border-primary text-primary hover:text-primary"
			>
				<FaChartBar />
				Tampilkan Grafik
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[60%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>
							Grafik Kehadiran Pegawai – {bulan} {tahun}
						</DialogTitle>
						<DialogDescription>
							Distribusi data kehadiran pegawai
						</DialogDescription>
					</DialogHeader>

					<div className="mt-4 h-[420px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={chartData}
								layout="horizontal" // bar berdiri (atas–bawah)
								margin={{ top: 16, right: 24, left: 0, bottom: 24 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="label" tickLine={false} axisLine={false} />
								<YAxis
									allowDecimals={false}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip />
								<Bar
									dataKey="value"
									fill="#1e5916"
									radius={[6, 6, 0, 0]}
									barSize={36}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
