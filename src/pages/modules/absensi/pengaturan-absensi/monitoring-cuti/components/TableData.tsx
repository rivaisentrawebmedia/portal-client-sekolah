import { BaseTable } from "@/components/common/BasicTable";
import type { MonitoringCuti } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

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
					header: "Kode",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.kode || "-"}</p>,
				},
				{
					header: "Nama Periode",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},
				{
					header: "Tgl. Mulai",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.mulai
								? dayjs(item?.mulai).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "Tgl. Berakhir",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.akhir
								? dayjs(item?.akhir).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},

				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonEdit rowData={item} />
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
