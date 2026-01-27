import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { BasicLabel } from "@/components/common/BasicLabel";
import { getBulanOptions } from "@/const/listTanggal";
import {
	ButtonCetakRiwayatKehadiran,
	ButtonChartRiwayatKehadiran,
	TableRiwayatKehadiranPerBulan,
} from "./components";

import dayjs from "dayjs";
import type { GetRiwayatKehadiranPerBulanParams } from "../detail-riwayat-kehadiran/model";
import {
	useGetRiwayatKehadiranPerBulan,
	useGetRiwayatKehadiranPerBulanChart,
} from "../detail-riwayat-kehadiran/controller";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";

export default function RiwayatKehadiranPerBulanPage() {
	const { fivethPathname, seventhPathname } = usePathname();
	const [params] = useSearchParams();
	const tahun = params.get("tahun");

	const paramsDefault: GetRiwayatKehadiranPerBulanParams = {
		pegawai_id: fivethPathname || "",
		tahun: tahun || "",
		bulan: seventhPathname || "",
	};

	const { data, loading } = useGetRiwayatKehadiranPerBulan(paramsDefault);
	const { data: dataChart, loading: loadingChart } =
		useGetRiwayatKehadiranPerBulanChart(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Daftar Pegawai",
							to: `/admin/presensi/kehadiran/riwayat-kehadiran`,
						},
						{
							label: "Riwayat Kehadiran",
							to: `/admin/presensi/kehadiran/riwayat-kehadiran/${fivethPathname}/riwayat-kehadiran?user-id=${fivethPathname}`,
						},
						{
							label: "Riwayat Kehadiran Per Bulan",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">
					Riwayat Kehadiran Per Bulan
				</p>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<div className="flex md:flex-row md:justify-between md:gap-4 flex-col gap-2">
						<BasicLabel
							label="Bulan"
							value={
								<p>
									{getBulanOptions()?.find(
										(list) =>
											list?.value?.toString() ===
											String(seventhPathname)?.padStart(2, "0"),
									)?.label || "-"}{" "}
									{tahun}
								</p>
							}
							className="flex flex-row gap-2"
						/>
						<div className="flex flex-col gap-2 md:flex-row md:gap-2.5">
							<ButtonChartRiwayatKehadiran
								dataChart={dataChart}
								loading={loadingChart}
								bulan={
									getBulanOptions()?.find(
										(list) =>
											list?.value?.toString() ===
											String(seventhPathname)?.padStart(2, "0"),
									)?.label || "-"
								}
								tahun={tahun || dayjs().locale("id").format("YYYY")}
							/>
							<ButtonCetakRiwayatKehadiran />
						</div>
					</div>
					<TableRiwayatKehadiranPerBulan
						data={data}
						loading={loading}
						limit={1000}
						page={1}
						search={""}
					/>
				</div>
			</div>
		</>
	);
}
