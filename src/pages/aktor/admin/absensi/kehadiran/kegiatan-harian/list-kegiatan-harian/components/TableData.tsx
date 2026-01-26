import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { KegiatanHarian } from "../model";
import { ButtonDetail } from "./ButtonDetail";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { convertFromSnakeCase } from "@/utils/helpers";
import { Check, X } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableKegiatanHarianProps {
	data: KegiatanHarian[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableKegiatanHarian({
	data,
	page,
	limit,
	search,
	loading,
}: TableKegiatanHarianProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada riwayat kehadiran"
			emptyDescription="Silakan tambahkan data riwayat kehadiran terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},

				{
					header: "Tanggal Kehadiran",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.tanggal
								? dayjs(item?.tanggal).locale("id").format("DD MMMM YYYY")
								: "-"}
						</p>
					),
				},

				{
					header: "Jam Masuk",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.jam_masuk?.slice(0, 5) || "-"}</p>
					),
				},
				{
					header: "Jam Keluar",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{item?.jam_keluar?.slice(0, 5) || "-"}
						</p>
					),
				},
				{
					header: "Pekerjaan",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.pekerjaan || "-"}</p>,
				},
				{
					header: "Status",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{convertFromSnakeCase(item?.status || "") || "-"}
						</p>
					),
				},
				{
					header: "Valid",
					className: "font-light text-[#1E5916] text-center",
					render: (item) => {
						return item?.valid === true ? (
							<div className="flex items-center gap-1 justify-center">
								<Check size={14} color="#27CD7F" />
								Valid
							</div>
						) : item?.valid === false ? (
							<div className="flex items-center gap-1 justify-center">
								<X size={14} color="#CD2738" />
								Tidak Valid
							</div>
						) : (
							<p>-</p>
						);
					},
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
