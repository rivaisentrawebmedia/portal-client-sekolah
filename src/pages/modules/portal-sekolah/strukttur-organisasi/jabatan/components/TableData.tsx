import { BaseTable } from "@/components/common/BasicTable";
import type { Jabatan } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { ToggleStatusClient } from "./ButtonStatus";
import { ButtonRiwayat } from "./ButtonRiwayat";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableJabatanProps {
	data: Jabatan[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableJabatan({
	data,
	page,
	limit,
	search,
	loading,
}: TableJabatanProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Jabatan"
			emptyDescription="Silakan tambahkan data Jabatan terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Kelompok",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.kelompok_jabatan || "-"}</p>,
				},

				{
					header: "Jabatan",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},

				{
					header: "Pemimpin Utama",
					className: "font-light text-[#1E5916] text-center",
					render: (item) => <ToggleStatusClient detail={item} />,
				},

				{
					header: "Pejabat Saat Ini",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.pejabat_nama || "-"}</p>,
				},

				{
					header: "Riwayat Pejabat",
					className: "font-light text-[#1E5916]",
					render: (item) => <ButtonRiwayat rowData={item} />,
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
