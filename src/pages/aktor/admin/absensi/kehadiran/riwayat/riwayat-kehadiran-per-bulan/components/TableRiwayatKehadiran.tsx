import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { convertFromSnakeCase } from "@/utils/helpers";
import { ButtonDetail } from "./ButtonDetail";
import { ButtonEdit } from "./ButtonEdit";
import type { RiwayatKehadiranPerBulan } from "../../detail-riwayat-kehadiran/model";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableRiwayatKehadiranPerBulanProps {
	data: RiwayatKehadiranPerBulan[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableRiwayatKehadiranPerBulan({
	data,
	page,
	limit,
	search,
	loading,
}: TableRiwayatKehadiranPerBulanProps) {
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
					header: "Hari",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{convertFromSnakeCase(item?.hari) || "-"}</p>,
				},
				{
					header: "Tanggal",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item.tanggal
								? dayjs(item?.tanggal).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "Jam Datang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item.jam_datang?.slice(0, 5) || "-"}</p>,
				},
				{
					header: "Jam Pulang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item.jam_pulang?.slice(0, 5) || "-"}</p>,
				},
				{
					header: "Lokasi Datang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item.lokasi_datang || "-"}</p>,
				},
				{
					header: "Lokasi Pulang",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item.lokasi_pulang || "-"}</p>,
				},
				{
					header: "Jenis Presensi",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item.jenis_presensi || "-"}</p>,
				},
				{
					header: "Keterangan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>{convertFromSnakeCase(item.keterangan) || "-"}</p>
					),
				},

				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonDetail rowData={item} />
							<ButtonEdit rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
