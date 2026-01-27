import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";
import type { NotifikasiPengajuanCuti } from "../model";
import { ButtonCuti } from "./ButtonCuti";
import { ButtonIzin } from "./ButtonIzin";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableNotifCutiProps {
	data: NotifikasiPengajuanCuti[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableNotifCuti({
	data,
	page,
	limit,
	search,
	loading,
}: TableNotifCutiProps) {
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
					header: "Tanggal Diajukan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex flex-col gap-0">
							<p>
								{item?.tanggal_diajukan
									? dayjs(item?.tanggal_diajukan)
											.locale("id")
											.format("DD-MM-YYYY")
									: "-"}
							</p>
							<p className="text-primary text-sm">
								{item?.tanggal_diajukan
									? dayjs(item.tanggal_diajukan).fromNow()
									: "-"}
							</p>
						</div>
					),
				},
				{
					header: "Jenis",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex flex-col gap-0">
							<p>{item?.type}</p>
							<p className="text-[#888] text-sm">{item?.jenis}</p>
						</div>
					),
				},
				{
					header: "Alasan",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						return <div className="flex flex-col gap-1">{item?.alasan}</div>;
					},
				},
				{
					header: "Lama Cuti/Izin",
					className: "font-light text-[#1E5916]",
					render: (item) => {
						const mulai = dayjs(item?.mulai);
						const selesai = dayjs(item?.selesai);

						// hitung jumlah hari (inklusif)
						const totalHari =
							item?.mulai && item?.selesai ? selesai.diff(mulai, "day") + 1 : 0;

						return (
							<div className="flex flex-col gap-0">
								{totalHari > 1 ? (
									<p>
										{dayjs(mulai).locale("id").format("DD-MM-YYYY")}{" "}
										{mulai !== selesai &&
											`s.d ${dayjs(selesai).locale("id").format("DD-MM-YYYY")}`}
									</p>
								) : (
									<p>{dayjs(mulai).locale("id").format("DD-MM-YYYY")} </p>
								)}
								<p className="text-[#888]">{totalHari} Hari</p>
							</div>
						);
					},
				},
				{
					header: "",
					className: "",
					render: (item) => (
						<div className="flex justify-center gap-2">
							{item?.type?.toLocaleLowerCase() === "cuti" ? (
								<ButtonCuti item={item} />
							) : (
								<ButtonIzin item={item} />
							)}
						</div>
					),
				},
			]}
		/>
	);
}
