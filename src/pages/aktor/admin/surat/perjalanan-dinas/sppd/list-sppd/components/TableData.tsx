import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { SPPD } from "../model";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableSPPDProps {
	data: SPPD[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableSPPD({
	data,
	page,
	limit,
	search,
	loading,
}: TableSPPDProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data SPPD"
			emptyDescription="Silakan tambahkan data SPPD terlebih dahulu"
			background="#e0efff"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#0f0f12]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Tgl. Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => (
						<p>
							{item?.tanggal_surat
								? dayjs(item?.tanggal_surat).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},

				{
					header: "No. Surat",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.format_nomor_surat || "-"}</p>,
				},

				{
					header: "Asal - Tujuan",
					className: "font-light text-[#0f0f12]",
					render: (item) => (
						<p>
							{item?.tempat_asal} - {item?.tempat_tujuan}
						</p>
					),
				},

				{
					header: "Transport",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.jenis_transportasi || "-"}</p>,
				},

				{
					header: "Jumlah Pegawai",
					className: "font-light text-[#0f0f12]",
					render: (item) => <p>{item?.list_pegawai?.length || "0"} Pegawai</p>,
				},
			]}
		/>
	);
}
