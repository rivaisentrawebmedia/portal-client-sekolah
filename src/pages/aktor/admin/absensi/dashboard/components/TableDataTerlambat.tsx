import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";
import type { PegawaiType } from "../model";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableDataTerlambatProps {
	data: PegawaiType[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableDataTerlambat({
	data,
	page,
	limit,
	search,
	loading,
}: TableDataTerlambatProps) {
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
					header: "Yang Mengajukan",
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
								<p className="text-primary text-sm font-light text-wrap ">
									{item?.nip || "-"}
								</p>
							</div>
						</div>
					),
				},

				{
					header: "Checkin",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						return (
							<div className="flex flex-col gap-1">
								{item?.checkin?.slice(0, 5)}
							</div>
						);
					},
				},
				{
					header: "Checkout",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						return (
							<div className="flex flex-col gap-1">
								{item?.checkout?.slice(0, 5)}
							</div>
						);
					},
				},
			]}
		/>
	);
}
