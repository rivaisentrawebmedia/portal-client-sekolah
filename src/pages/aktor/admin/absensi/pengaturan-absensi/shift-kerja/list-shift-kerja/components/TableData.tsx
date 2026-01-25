import { BaseTable } from "@/components/common/BasicTable";
import type { ShiftKerja } from "../model";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableShiftKerjaProps {
	data: ShiftKerja[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableShiftKerja({
	data,
	page,
	limit,
	search,
	loading,
}: TableShiftKerjaProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data Shift Kerja"
			emptyDescription="Silakan tambahkan data Shift Kerja terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Nama Shift",
					className: "font-light text-[#1E5916]",
					render: (item) => <p>{item?.nama || "-"}</p>,
				},

				{
					header: "Senin",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "senin",
						);

						if (value?.is_libur) {
							return "-";
						}

						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
				},

				{
					header: "Selasa",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "selasa",
						);

						if (value?.is_libur) {
							return "-";
						}
						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
				},

				{
					header: "Rabu",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "rabu",
						);

						if (value?.is_libur) {
							return "-";
						}

						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
				},

				{
					header: "Kamis",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "kamis",
						);

						if (value?.is_libur) {
							return "-";
						}
						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
				},

				{
					header: "Jumat",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "jumat",
						);

						if (value?.is_libur) {
							return "-";
						}

						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
				},

				{
					header: "Sabtu",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const value = item?.jam_kerja?.find(
							(item) => item?.hari === "sabtu",
						);

						if (value?.is_libur) {
							return "-";
						}

						return (
							<p>
								{value?.jam_masuk?.slice(0, 5)} -{" "}
								{value?.jam_pulang?.slice(0, 5)}
							</p>
						);
					},
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
