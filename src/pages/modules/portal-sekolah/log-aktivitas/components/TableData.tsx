import { BaseTable } from "@/components/common/BasicTable";
import type { LogAktivitas } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { convertFromSnakeCase } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableLogAktivitasProps {
	data: LogAktivitas[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableLogAktivitas({
	data,
	page,
	limit,
	search,
	loading,
}: TableLogAktivitasProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data log aktivitas"
			emptyDescription="Silakan tambahkan data log aktivitas terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Tgl & Waktu",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex flex-col gap-0">
							<p>
								{item?.created_at
									? dayjs(item?.created_at).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
							<p className="text-sm text-[#888]">
								{item?.created_at
									? dayjs(item?.created_at).locale("id").format("HH:mm:ss")
									: "-"}
							</p>
						</div>
					),
				},
				{
					header: "Nama User",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.user_nama || "-"}</p>,
				},
				{
					header: "Modul",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.modul || "-"}</p>,
				},
				{
					header: "Aktivitas",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>{convertFromSnakeCase(item?.aktifitas) || "-"}</p>
					),
				},
				{
					header: "Deskripsi",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.deskripsi || "-"}</p>,
				},
			]}
		/>
	);
}
