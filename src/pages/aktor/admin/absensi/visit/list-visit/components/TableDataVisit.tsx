import { BaseTable } from "@/components/common/BasicTable";
import type { RekapVisit } from "../model";
import { getInitials } from "@/utils/helpers";
import { ButtonDetailRekap } from "./ButtonDetailRekap";

interface TableRekapVisitProps {
	data: RekapVisit[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableRekapVisit({
	data,
	page,
	limit,
	search,
	loading,
}: TableRekapVisitProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data rekap visit"
			emptyDescription="Data rekap visit akan tampil di sini"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},

				// ===== Pegawai =====
				{
					header: "Pegawai",
					className: "text-[#1E5916]",
					render: (item) => (
						<div className="flex items-center gap-3">
							{item?.photo ? (
								<img
									src={item.photo}
									alt={item.nama}
									className="h-9 w-9 rounded-full object-cover"
								/>
							) : (
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
									{getInitials(item?.nama)?.slice(0, 2)}
								</div>
							)}

							<div className="flex flex-col">
								<p className="font-medium">{item?.nama || "-"}</p>
								<p className="text-xs text-muted-foreground">
									{item?.nip || "-"}
								</p>
							</div>
						</div>
					),
				},

				{
					header: "Jumlah Visit",
					className: "text-[#1E5916] text-center",
					render: (item) => (
						<p className="text-center">{item?.jumlah_visit || "-"}</p>
					),
				},

				{
					header: "Diajukan",
					className: "text-[#1E5916] text-center",
					render: (item) => (
						<p className="text-center">{item?.jumlah_diajukan || "-"}</p>
					),
				},

				{
					header: "Disetujui",
					className: "text-[#1E5916] text-center",
					render: (item) => (
						<p className="text-center">{item?.jumlah_disetujui || "-"}</p>
					),
				},

				{
					header: "Ditolak",
					className: "text-[#1E5916] text-center",
					render: (item) => (
						<p className="text-center">{item?.jumlah_ditolak || "-"}</p>
					),
				},

				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetailRekap rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
