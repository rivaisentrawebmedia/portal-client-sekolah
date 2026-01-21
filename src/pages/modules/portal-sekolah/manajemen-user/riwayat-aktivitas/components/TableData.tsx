import { BaseTable } from "@/components/common/BasicTable";
import "dayjs/locale/id";
import type { RiwayatAktivitas } from "../../list-user/model";
import { convertFromSnakeCase } from "@/utils/helpers";
import dayjs from "dayjs";

interface TableRiwayatAktivitasProps {
	data: RiwayatAktivitas[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableRiwayatAktivitas({
	data,
	page,
	limit,
	search,
	loading,
}: TableRiwayatAktivitasProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data riwayat aktivitas"
			emptyDescription="Silakan tambahkan data riwayat aktivitas terlebih dahulu"
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
						<p>
							{item?.created_at
								? dayjs(item?.created_at)
										.locale("id")
										.format("DD-MM-YYYY HH:mm:ss")
								: "-"}
						</p>
					),
				},

				{
					header: "Device",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{convertFromSnakeCase(item?.device) || "-"}</p>,
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
					render: (item) => <p>{item?.deskripsi || ""}</p>,
				},
			]}
		/>
	);
}
