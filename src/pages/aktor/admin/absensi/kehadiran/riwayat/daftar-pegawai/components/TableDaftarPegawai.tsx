import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";
import clsx from "clsx";
import type { ManajemenUser } from "@/pages/aktor/admin/portal-admin/manajemen-user/list-user/model";
import { badgeColors } from "@/pages/aktor/admin/portal-admin/strukttur-organisasi/jabatan/components";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TableManajemenUserProps {
	data: ManajemenUser[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
}

export function TableDaftarPegawai({
	data,
	page,
	limit,
	search,
	loading,
}: TableManajemenUserProps) {
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
					header: "Nama User",
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
								<p className="text-primary font-light text-wrap ">
									{item?.jabatan || "-"}
								</p>
							</div>
						</div>
					),
				},
				{
					header: "Akses",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<div className="flex flex-wrap gap-2">
							{item?.akses?.map((item, idx) => {
								return (
									<p
										className={clsx(
											"px-3 py-1.5 rounded-md text-white text-xs",
											badgeColors[idx] ?? "bg-gray-400",
										)}
										key={idx}
									>
										{item}
									</p>
								);
							})}
						</div>
					),
				},
				{
					header: "Terakhir Online",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p className="text-primary italic">
							{item?.terakhir_online
								? dayjs(item.terakhir_online).fromNow()
								: "-"}
						</p>
					),
				},
				{
					header: "Tgl. Ditambahkan",
					className: "font-light text-[#1E5916]",
					render: (item) => (
						<p>
							{item?.created_at
								? dayjs(item?.created_at).locale("id").format("DD-MM-YYYY")
								: "-"}
						</p>
					),
				},
				{
					header: "",
					className: "w-[100px]",
					render: (item) => (
						<div className="flex justify-center gap-2">
							<Link
								to={`${item?.id}/riwayat-kehadiran?user-id=${item?.id}`}
								className="bg-[#2769CD] p-1.5 rounded-md text-white"
							>
								<FaInfoCircle />
							</Link>
						</div>
					),
				},
			]}
		/>
	);
}
