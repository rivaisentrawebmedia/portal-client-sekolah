import { BaseTable } from "@/components/common/BasicTable";
import type { MonitoringCuti } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonDetail } from "./ButtonDetail";
import { getInitials } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableMonitoringCutiProps {
	data: MonitoringCuti[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableMonitoringCuti({
	data,
	page,
	limit,
	search,
	loading,
}: TableMonitoringCutiProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Monitoring Cuti"
			emptyDescription="Silakan tambahkan data Monitoring Cuti terlebih dahulu"
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
						<div className="flex items-center gap-2">
							{item?.photo ? (
								<img
									src={item?.photo}
									alt={item?.nama}
									className="w-9 h-9 rounded-full"
								/>
							) : (
								<div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white">
									{getInitials(item?.nama)?.slice(0, 2)}
								</div>
							)}
							<div className="flex flex-col">
								<p>{item?.nama || "-"}</p>
								<p className="text-sm text-[#888]">{item?.nip || "-"}</p>
							</div>
						</div>
					),
				},

				{
					header: "Jumlah Cuti (hari)",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.cuti_terpakai || "-"}</p>,
				},

				{
					header: "Cuti Terpakai (Hari)",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.cuti_terpakai || "-"}</p>,
				},

				{
					header: "Sisa Cuti (Hari)",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.sisa_cuti || "-"}</p>,
				},
				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetail rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
