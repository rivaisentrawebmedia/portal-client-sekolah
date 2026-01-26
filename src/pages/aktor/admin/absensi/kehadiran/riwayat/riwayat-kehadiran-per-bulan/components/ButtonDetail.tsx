import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { BasicLabel } from "@/components/common/BasicLabel";
import { convertFromSnakeCase, getInitials } from "@/utils/helpers";
import dayjs from "dayjs";
import { HtmlPreview } from "@/utils/safeHTML";
import type { RiwayatKehadiranPerBulan } from "../../detail-riwayat-kehadiran/model";

export function ButtonDetail({
	rowData,
}: {
	rowData?: RiwayatKehadiranPerBulan;
}) {
	const [isShow, setIsShow] = useState<boolean>(false);

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								setIsShow(true);
							}}
							className="bg-[#2769cd] p-1.5 rounded-md text-white"
						>
							<FaInfoCircle size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Detail data</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Detail Kehadiran Pegawai</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						{rowData?.photo ? (
							<img src={rowData?.photo} alt={rowData?.hari} className="w-1/3" />
						) : (
							<div className="w-1/3 min-h-36 rounded-md bg-primary text-white flex items-center justify-center text-2xl">
								{getInitials("Joko Wiseso")}
							</div>
						)}

						<div className="flex flex-col gap-2">
							<BasicLabel
								label="Hari/Tanggal"
								value={
									<p>
										{convertFromSnakeCase(rowData?.hari || "")} /{" "}
										{rowData?.tanggal
											? dayjs(rowData?.tanggal)
													.locale("id")
													.format("DD MMMM YYYY")
											: "-"}
									</p>
								}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Jenis Presensi"
								value={
									<p>
										{convertFromSnakeCase(rowData?.jenis_presensi || "") || "-"}
									</p>
								}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Jam Bekerja"
								value={
									<p>
										{rowData?.jam_datang?.slice(0, 5) || ""} -{" "}
										{rowData?.jam_pulang?.slice(0, 5) || ""}
									</p>
								}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Lokasi Datang"
								value={<p>{rowData?.lokasi_datang || "-"}</p>}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Lokasi Pulang"
								value={<p>{rowData?.lokasi_pulang || "-"}</p>}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Rencana Pekerjaan"
								value={<HtmlPreview html={rowData?.rencana_pekerjaan || ""} />}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Realisasi Pekerjaan"
								value={
									<HtmlPreview html={rowData?.realisasi_pekerjaan || ""} />
								}
								className="flex flex-row gap-2"
							/>
							<BasicLabel
								label="Keterangan"
								value={
									<p>
										{convertFromSnakeCase(rowData?.keterangan || "") || "-"}
									</p>
								}
								className="flex flex-row gap-2"
							/>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
