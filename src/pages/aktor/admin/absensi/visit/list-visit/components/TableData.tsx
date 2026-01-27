import { BaseTable } from "@/components/common/BasicTable";
import type { Visit } from "../model";
import { convertSlugToText, getInitials } from "@/utils/helpers";
import dayjs from "dayjs";
import { Check, Hourglass, X } from "lucide-react";
import { ButtonDetail } from "./ButtonDetail";
import { ButtonDelete } from "./ButtonDelete";

interface TableVisitProps {
	data: Visit[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	checked: string[];
}

export function TableVisit({
	data,
	page,
	limit,
	search,
	loading,
	checked,
	setChecked,
}: TableVisitProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data visit"
			emptyDescription="Data visit akan tampil di sini"
			checkedPool={{
				getId: (row) => row?.id,
				value: checked,
				onChange: setChecked,
			}}
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
					header: "Tgl. Diajukan",
					className: "text-[#1E5916]",
					render: (item) => (
						<div className="flex text-[#888] text-sm flex-col gap-0">
							<p>
								{item?.tanggal_diajukan
									? dayjs(item?.tanggal_diajukan)
											.locale("id")
											.format("DD-MM-YYYY")
									: "-"}
							</p>
							<p>
								{item?.tanggal_diajukan
									? dayjs(item?.tanggal_diajukan)
											.locale("id")
											.format("HH:mm:ss")
									: "-"}
							</p>
						</div>
					),
				},
				{
					header: "Tgl. Diajukan",
					className: "text-[#1E5916]",
					render: (item) => <p>{item?.lokasi || "-"}</p>,
				},
				{
					header: "Tujuan Visit",
					className: "text-[#1E5916]",
					render: (item) => <p>{item?.tujuan_visit || "-"}</p>,
				},
				{
					header: "Status",
					className: "text-[#1E5916]",
					render: (item) => {
						return item?.status === "diajukan" ? (
							<div className="flex items-center gap-1">
								<Hourglass size={14} color="#2769CD" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "disetujui" ? (
							<div className="flex items-center gap-1">
								<Check size={14} color="#27CD7F" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "ditolak" ? (
							<div className="flex items-center gap-1">
								<X size={14} color="#CD2738" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : (
							<></>
						);
					},
				},
				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetail rowData={item} />
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
