import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { RiwayatKehadiran } from "../model";
import { ButtonPrint } from "./ButtonPrint";
import { ButtonDetail } from "./ButtonDetail";
import { getBulanOptions } from "@/const/listTanggal";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableRiwayatKehadiranProps {
	data: RiwayatKehadiran[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	pegawai_id: string;
}

export function TableRiwayatKehadiran({
	data,
	page,
	limit,
	search,
	loading,
	pegawai_id,
}: TableRiwayatKehadiranProps) {
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
					header: "Bulan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{getBulanOptions()?.find(
								(list) =>
									list?.value?.toString() ===
									String(item?.bulan)?.padStart(2, "0"),
							)?.label || "-"}
						</p>
					),
				},
				{
					header: "Hari Kerja",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.hari_kerja || "-"}</p>
					),
				},
				{
					header: "Hadir",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.hadir || "-"}</p>,
				},
				{
					header: "Hadir Libur",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.hadir_libur || "-"}</p>
					),
				},
				{
					header: "Terlambat",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.terlambat || "-"}</p>
					),
				},
				{
					header: "Pulang Awal",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">{item?.pulang_awal || "-"}</p>
					),
				},
				{
					header: "Sakit",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.sakit || "-"}</p>,
				},
				{
					header: "izin",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.izin || "-"}</p>,
				},
				{
					header: "Alfa",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.alpha || "-"}</p>,
				},
				{
					header: "Cuti",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => <p className="text-center">{item?.cuti || "-"}</p>,
				},
				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonPrint />
							<ButtonDetail pegawai_id={pegawai_id} rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
