import { BaseTable } from "@/components/common/BasicTable";
import type { BagianSurat } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { FormatSurat } from "./FormatNoSurat";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableBagianSuratProps {
	data: BagianSurat[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableBagianSurat({
	data,
	page,
	limit,
	search,
	loading,
}: TableBagianSuratProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Bagian Surat"
			emptyDescription="Silakan tambahkan data Bagian Surat terlebih dahulu"
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
					header: "Bagian Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},

				{
					header: "Format Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => <FormatSurat data={item} />,
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
