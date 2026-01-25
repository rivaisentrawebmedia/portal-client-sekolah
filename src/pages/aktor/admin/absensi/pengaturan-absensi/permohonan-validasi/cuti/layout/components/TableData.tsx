import { BaseTable } from "@/components/common/BasicTable";
import type { PermohonanCuti } from "../model";
import { convertSlugToText, getInitials } from "@/utils/helpers";
import dayjs from "dayjs";
import { Check, Hourglass, NotebookPen, RotateCcw, X } from "lucide-react";
import { ButtonDetail } from "./ButtonDetail";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

interface TablePermohonanCutiProps {
	data: PermohonanCuti[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	checked: string[];
	user_id?: string;
}

export function TablePermohonanCuti({
	data,
	page,
	limit,
	search,
	loading,
	checked,
	setChecked,
	user_id,
}: TablePermohonanCutiProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data permohonan cuti"
			emptyDescription="Silakan tambahkan data permohonan cuti terlebih dahulu"
			checkedPool={{
				getId: (row) => row.id,
				value: checked,
				onChange: setChecked,
			}}
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},

				{
					header: "Pegawai",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex items-center gap-2">
							{item?.photo ? (
								<img
									src={item?.photo}
									alt={item?.nama}
									className="w-9 h-9 rounded-full"
								/>
							) : (
								<div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white">
									{getInitials(item?.nama)?.slice(0, 2)}
								</div>
							)}
							<div className="flex flex-col">
								<p>{item?.nama || "-"}</p>
								<p className="text-sm text-[#888]">{item?.nip || "-"}</p>
							</div>
						</div>
					),
				},
				{
					header: "Tgl. Diajukan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.tanggal_diajukan
								? dayjs(item?.tanggal_diajukan)
										.locale("id")
										.format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "Jenis Cuti",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.jenis_cuti || "-"}</p>,
				},
				{
					header: "Keperluan",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.alasan_cuti || item?.keperluan}</p>,
				},
				{
					header: "Periode Cuti",
					className: "font-light text-[#1E5916] text-center",
					render: (item) => (
						<div className="flex text-[#888] text-center text-sm flex-col items-center justify-center">
							<p>
								{item?.mulai
									? dayjs(item?.mulai).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
							<p>s.d</p>
							<p>
								{item?.selesai
									? dayjs(item?.selesai).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
					),
				},
				{
					header: "Status",
					className: "font-light text-[#1E5916]",
					render: (item) =>
						item?.status === "draft" ? (
							<div className="flex items-center gap-1">
								<NotebookPen size={14} color="#888888" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "diajukan" ? (
							<div className="flex items-center gap-1">
								<Hourglass size={14} color="#2769CD" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "disetujui" ? (
							<div className="flex items-center gap-1">
								<Check size={14} color="#27CD7F" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "dibatalkan" ? (
							<div className="flex items-center gap-1">
								<RotateCcw color="#CDA327" size={14} />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : item?.status === "ditolak" ? (
							<div className="flex items-center gap-1">
								<X size={14} color="#CD2738" />
								<p>{convertSlugToText(item?.status)}</p>
							</div>
						) : (
							<></>
						),
				},
				{
					header: "",
					className: "md:w-[150px]",
					render: (item) => (
						<div className="flex justify-center flex-wrap gap-2">
							<ButtonDetail rowData={item} user_id={user_id} />
							<ButtonEdit rowData={item} />
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
