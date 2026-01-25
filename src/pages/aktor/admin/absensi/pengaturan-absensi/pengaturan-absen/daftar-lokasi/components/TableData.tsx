import { BaseTable } from "@/components/common/BasicTable";
import type { DaftarLokasi } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableDaftarLokasiProps {
	data: DaftarLokasi[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableDaftarLokasi({
	data,
	page,
	limit,
	search,
	loading,
}: TableDaftarLokasiProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Daftar Lokasi"
			emptyDescription="Silakan tambahkan data Daftar Lokasi terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Nama Lokasi / Gedung",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},

				{
					header: "Longtitude",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.longtitude || "-"}</p>,
				},

				{
					header: "Latitude",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.latitude || "-"}</p>,
				},

				{
					header: "Radius Presensi (meter)",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.radius || "-"}</p>,
				},

				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<ButtonEdit rowData={item} />
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
