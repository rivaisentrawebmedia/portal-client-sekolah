import { BaseTable } from "@/components/common/BasicTable";
import type { RekapHarian } from "../model";
import { ButtonCheckin } from "./ButtonCheckIn";
import { ButtonCheckout } from "./ButtonCheckout";
import { getInitials } from "@/utils/helpers";

interface TableRekapHarianProps {
	data: RekapHarian[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	status: string;
}

const STATUS_WITH_CLOCK = ["hadir"];
const STATUS_WITH_KETERANGAN = [
	"sakit",
	"izin",
	"alfa",
	"cuti",
	"perjalanan_dinas",
];

export function TableRekapHarian({
	data,
	page,
	limit,
	search,
	loading,
	status,
}: TableRekapHarianProps) {
	const showClock = status === "semua" || STATUS_WITH_CLOCK.includes(status);

	const showKeterangan =
		status === "semua" || STATUS_WITH_KETERANGAN.includes(status);

	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			emptyTitle="Belum ada data rekap kehadiran"
			emptyDescription="Data kehadiran pegawai akan tampil di sini"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center text-[#1E5916]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},

				// ===== Pegawai =====
				{
					header: "Pegawai",
					className: "text-[#1E5916]",
					render: (item) => (
						<div className="flex items-center gap-3">
							{item?.photo ? (
								<img
									src={item.photo}
									alt={item.nama}
									className="h-9 w-9 rounded-full object-cover"
								/>
							) : (
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
									{getInitials(item?.nama)?.slice(0, 2)}
								</div>
							)}

							<div className="flex flex-col">
								<p className="font-medium">{item?.nama || "-"}</p>
								<p className="text-xs text-muted-foreground">
									{item?.nip || "-"}
								</p>
							</div>
						</div>
					),
				},

				// ===== Clock In =====
				...(showClock
					? [
							{
								header: "Clock In",
								className: "text-[#1E5916]",
								render: (item: RekapHarian) =>
									item?.checkin ? <ButtonCheckin rowData={item} /> : "-",
							},
						]
					: []),

				// ===== Clock Out =====
				...(showClock
					? [
							{
								header: "Clock Out",
								className: "text-[#1E5916]",
								render: (item: RekapHarian) =>
									item?.checkout ? <ButtonCheckout rowData={item} /> : "-",
							},
						]
					: []),

				// ===== Keterangan =====
				...(showKeterangan
					? [
							{
								header: "Keterangan",
								className: "text-[#1E5916]",
								render: (item: RekapHarian) => <p>{item?.keterangan || "-"}</p>,
							},
						]
					: []),
			]}
		/>
	);
}
