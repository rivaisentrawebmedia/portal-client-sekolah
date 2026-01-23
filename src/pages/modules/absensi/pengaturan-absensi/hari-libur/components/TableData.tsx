import { BaseTable } from "@/components/common/BasicTable";
import type { HariLibur } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableHariLiburProps {
	data: HariLibur[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableHariLibur({
	data,
	page,
	limit,
	search,
	loading,
}: TableHariLiburProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Hari Libur"
			emptyDescription="Silakan tambahkan data Hari Libur terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Nama",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},

				{
					header: "Tgl. Mulai",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.tanggal_mulai
								? dayjs(item?.tanggal_mulai).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "Tgl. Berakhir",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.tanggal_akhir
								? dayjs(item?.tanggal_akhir).locale("id").format("DD-MM-YYYY")
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
