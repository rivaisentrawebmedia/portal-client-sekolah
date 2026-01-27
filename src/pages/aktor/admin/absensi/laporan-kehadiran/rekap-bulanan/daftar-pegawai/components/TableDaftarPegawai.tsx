import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";
import type { RekapBulanan } from "../model";
import { ButtonDetail } from "./ButtonDetail";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableRekapBulananProps {
	data: RekapBulanan[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableDaftarPegawai({
	data,
	page,
	limit,
	search,
	loading,
}: TableRekapBulananProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data user"
			emptyDescription="Silakan tambahkan data user terlebih dahulu"
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
						<div className="flex gap-2">
							{item?.photo ? (
								<img
									src={item?.photo}
									alt={item?.nama}
									className="h-8 w-8 rounded-full"
								/>
							) : (
								<div className="flex h-8 w-8 bg-[#01001a] text-white rounded-full items-center justify-center">
									{getInitials(item?.nama)}
								</div>
							)}

							<div className="flex flex-1 flex-col gap-0">
								<p className="font-medium">{item?.nama || "-"}</p>
								<p className="text-primary font-light text-wrap ">
									{item?.nip || "-"}
								</p>
							</div>
						</div>
					),
				},

				{
					header: "Hari Efektif",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.hari_efektif || "-"}</p>
					),
				},
				{
					header: "Hadir",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.hadir || "-"}</p>,
				},
				{
					header: "Tugas Luar",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.tugas_luar || "-"}</p>
					),
				},
				{
					header: "Izin",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.izin || "-"}</p>,
				},
				{
					header: "Cuti",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.cuti || "-"}</p>,
				},
				{
					header: "Alfa",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.alpha || "-"}</p>,
				},
				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetail item={item} />
						</div>
					),
				},
			]}
		/>
	);
}
