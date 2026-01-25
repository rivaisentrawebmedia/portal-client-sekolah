import { BaseTable } from "@/components/common/BasicTable";
import type { MonitoringKehadiran } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { convertFromSnakeCase } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableMonitoringKehadiranProps {
	data: MonitoringKehadiran[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableMonitoringKehadiran({
	data,
	page,
	limit,
	search,
	loading,
}: TableMonitoringKehadiranProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Monitoring Kehadiran"
			emptyDescription="Silakan tambahkan data Monitoring Kehadiran terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Pegawai",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex flex-col">
							<p>{item?.nama || "-"}</p>
							<p className="text-[#888]">{item?.nip || "-"}</p>
						</div>
					),
				},
				{
					header: "Jam Datang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.jam_datang?.slice(0, 5) || "-"}</p>,
				},
				{
					header: "Jam Pulang	",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.lokasi_datang || "-"}</p>,
				},
				{
					header: "Lokasi Datang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.lokasi_datang || "-"}</p>,
				},
				{
					header: "Lokasi Pulang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.lokasi_pulang || "-"}</p>,
				},
				{
					header: "Status Presensi",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{convertFromSnakeCase(item?.status) || "-"}</p>,
				},
				{
					header: "Keterangan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>{convertFromSnakeCase(item?.keterangan) || "-"}</p>
					),
				},
			]}
		/>
	);
}
