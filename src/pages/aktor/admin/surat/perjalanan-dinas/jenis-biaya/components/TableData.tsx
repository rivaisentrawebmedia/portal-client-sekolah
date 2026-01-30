import { BaseTable } from "@/components/common/BasicTable";
import type { JenisBiaya } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableJenisBiayaProps {
	data: JenisBiaya[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableJenisBiaya({
	data,
	page,
	limit,
	search,
	loading,
}: TableJenisBiayaProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			background="#e0efff"
			emptyTitle="Belum ada data Jenis Biaya"
			emptyDescription="Silakan tambahkan data Jenis Biaya terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#0f0f12]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Nama",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},
				{
					header: "Kode",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.kode || "-"}</p>,
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
