import { BaseTable } from "@/components/common/BasicTable";
import type { Anggaran } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { formatRupiah } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableAnggaranProps {
	data: Anggaran[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableAnggaran({
	data,
	page,
	limit,
	search,
	loading,
}: TableAnggaranProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			background="#e0efff"
			emptyTitle="Belum ada data Anggaran"
			emptyDescription="Silakan tambahkan data Anggaran terlebih dahulu"
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
					header: "Tahun",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.tahun || "-"}</p>,
				},
				{
					header: "Jumlah",
					className: "font-light text-end text-[#0f0f12]",
					render: (item) => (
						<p className="text-end">Rp. {formatRupiah(item?.jumlah || 0)}</p>
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
