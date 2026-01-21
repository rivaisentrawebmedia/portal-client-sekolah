import { Skeleton } from "@/components/ui/skeleton";
import type { RiwayatPejabat } from "../model";
import { getInitials } from "@/utils/helpers";
import { FaCalendarDay } from "react-icons/fa";
import dayjs from "dayjs";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { JokoSetting } from "@/assets/icons/JokoSetting";
import { ButtonEditMasaJabatan } from "./ButtonEditMasaJabatan";
import { useNavigate } from "react-router-dom";
import { ButtonEditGantiPejabat } from "./ButtonEditGantiPejabat";

export const badgeColors = [
	"bg-[#1E5916]", // idx 0
	"bg-[#CDA327]", // idx 1
	"bg-[#0E874E]", // idx 2
	"bg-[#1F3C88]", // idx 3
	"bg-[#6A1B9A]", // idx 4
	"bg-[#C62828]", // idx 5
	"bg-[#EF6C00]", // idx 6
	"bg-[#00838F]", // idx 7
	"bg-[#455A64]", // idx 8
	"bg-[#2E7D32]", // idx 9
];
export function DetailJabatan({
	data,
	loading,
}: {
	data: RiwayatPejabat | undefined;
	loading: boolean;
}) {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row bg-[#f6fff5] border border-primary p-3 rounded-md">
				{/* FOTO / AVATAR */}
				{loading ? (
					<Skeleton className="h-30 w-30 rounded-md" />
				) : data?.pejabat_photo ? (
					<img
						src={data.pejabat_photo}
						alt={data.pejabat_nama}
						className="h-30 w-30 rounded-md"
					/>
				) : (
					<div className="flex h-30 w-30 bg-[#01001a] text-white rounded-md items-center justify-center">
						{getInitials(data?.pejabat_nama || "")}
					</div>
				)}

				{/* DETAIL */}
				<div className="flex flex-col gap-1.5 flex-1">
					{/* NIP */}
					{loading ? (
						<Skeleton className="h-4 w-40" />
					) : (
						<p className="font-medium text-[#1E5916]">
							NIP. {data?.pejabat_nip || "-"}
						</p>
					)}

					{/* NAMA */}
					{loading ? (
						<Skeleton className="h-6 w-64" />
					) : (
						<p className="text-lg">{data?.pejabat_nama || "-"}</p>
					)}

					{/* INFO ITEMS */}
					{loading ? (
						<>
							<InfoSkeleton />
							<InfoSkeleton />
							<InfoSkeleton />
							<InfoSkeleton />
						</>
					) : (
						<>
							<InfoItem
								icon={<FaCalendarDay color="#1E5916" />}
								value={
									<p className="text-[#888]">
										{data?.mulai
											? dayjs(data?.mulai).locale("id").format("DD-MM-YYYY")
											: ""}{" "}
										s.d{" "}
										{data?.selesai
											? dayjs(data?.selesai).locale("id").format("DD-MM-YYYY")
											: ""}
									</p>
								}
							/>
							<div className="flex flex-wrap gap-2">
								<p>Akses:</p>{" "}
								{data?.akses?.map((item, idx) => {
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
						</>
					)}
				</div>

				<div className="flex flex-col gap-2 items-center w-full md:w-fit">
					<ButtonEditMasaJabatan rowData={data} />

					<ButtonEditGantiPejabat rowData={data} />
					<Button
						type="button"
						className="border-[#1E5916] justify-start w-full text-[#1E5916]"
						variant="outline"
						onClick={() => {
							navigate(
								`/modules/manajemen-user/edit-user/kontrol-akses?user-id=${data?.pejabat_id}`,
							);
						}}
					>
						<JokoSetting />
						Kontrol Akses
					</Button>
				</div>
			</div>
		</>
	);
}

function InfoSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-48" />
		</div>
	);
}

function InfoItem({
	icon,
	value,
}: {
	icon: React.ReactNode;
	value?: string | React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-2">
			{icon}
			<p className="text-sm">{value || "-"}</p>
		</div>
	);
}
