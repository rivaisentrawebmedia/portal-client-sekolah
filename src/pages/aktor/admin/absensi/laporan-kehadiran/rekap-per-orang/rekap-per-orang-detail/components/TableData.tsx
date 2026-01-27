import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { ItemsRekapPerOrang } from "../model";
import { convertFromSnakeCase } from "@/utils/helpers";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableRekapPerOrangProps {
	data: ItemsRekapPerOrang[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableRekapPerOrang({
	data,
	page,
	limit,
	search,
	loading,
}: TableRekapPerOrangProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data user"
			emptyDescription="Silakan tambahkan data user terlebih dahulu"
			rowClassName={(item: ItemsRekapPerOrang) => {
				if (item.is_libur) {
					return "bg-red-50 hover:bg-red-100";
				}

				if (item.terlambat > 0 || item.pulang_cepat > 0) {
					return "bg-yellow-50 hover:bg-yellow-100";
				}

				return "";
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
					header: "Hari",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{convertFromSnakeCase(item?.hari) || "-"}</p>,
				},
				{
					header: "Tanggal",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.tanggal
								? dayjs(item?.tanggal).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "Jam Datang",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{item?.jam_datang?.slice(0, 5) || "-"}
						</p>
					),
				},
				{
					header: "Terlambat",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{item?.terlambat > 0 ? `${item?.terlambat} menit` : "-"}
						</p>
					),
				},
				{
					header: "Jam Pulang",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{item?.jam_pulang?.slice(0, 5) || "-"}
						</p>
					),
				},
				{
					header: "Pulang Cepat",
					className: "font-light text-center text-[#1E5916]",
					render: (item) => (
						<p className="text-center">
							{item?.pulang_cepat ? `${item?.pulang_cepat} menit` : "-"}
						</p>
					),
				},
			]}
		/>
	);
}
