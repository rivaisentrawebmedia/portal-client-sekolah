import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { Item } from "../model";
import { formatRupiah } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableLumpsumProps {
	data: Item[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableLumpsum({
	data,
	page,
	limit,
	search,
	loading,
}: TableLumpsumProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Surat Tugas"
			emptyDescription="Silakan tambahkan data Surat Tugas terlebih dahulu"
			background="#e0efff"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#0f0f12]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Jenis",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.jenis_biaya_nama || "-"}</p>,
				},

				{
					header: "Satuan Kerja",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.satuan_kerja || "-"}</p>,
				},

				{
					header: "Jumlah",
					className: "font-light text-end text-[#0f0f12]",
					render: (item) => (
						<p className="text-end">
							Rp.{" "}
							{formatRupiah(
								Number(item?.harga || 0) * Number(item?.qty || 1),
							) || ""}
						</p>
					),
				},

				{
					header: "Sumber Dana",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.sumber_dana || "-"}</p>,
				},
			]}
		/>
	);
}
