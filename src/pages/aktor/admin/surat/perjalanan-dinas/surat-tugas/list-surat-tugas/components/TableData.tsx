import { BaseTable } from "@/components/common/BasicTable";
import type { SuratTugas } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { ButtonDetail } from "./ButtonDetail";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableSuratTugasProps {
	data: SuratTugas[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableSuratTugas({
	data,
	page,
	limit,
	search,
	loading,
}: TableSuratTugasProps) {
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
					header: "Tgl. Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => (
						<p>
							{item?.tanggal_surat
								? dayjs(item?.tanggal_surat).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},

				{
					header: "No. Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.format_nomor_surat || "-"}</p>,
				},

				{
					header: "Jlh. Pegawai",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.list_pegawaI?.length || 0} Orang</p>,
				},

				{
					header: "Kegiatan",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.kegiatan || "-"}</p>,
				},

				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetail rowData={item} />
							<ButtonEdit rowData={item} />
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
