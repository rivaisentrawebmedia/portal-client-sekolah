import type { SuratTugas } from "../model";
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
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BasicLabel } from "@/components/common/BasicLabel";

export function ButtonListPegawai({ rowData }: { rowData?: SuratTugas }) {
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
							className="flex items-center gap-1"
						>
							<FaUserCircle size={14} />
							<p>{rowData?.list_pegawai?.length || 0} Orang</p>
						</button>
					</TooltipTrigger>
					<TooltipContent>Lihat Pegawai</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md overflow-auto rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>List Pegawai</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F5F9FF]">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tanggal Surat</p>
							<p className="flex-1">
								{rowData?.tanggal_surat
									? dayjs(rowData?.tanggal_surat)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"}
							</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Nomor Surat</p>
							<p className="flex-1">{rowData?.format_nomor_surat || "-"}</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Kegiatan</p>
							<ul className="flex-1 list-disc ml-4">
								{(rowData?.kegiatan || [])?.length > 0
									? rowData?.kegiatan?.map((item, idx) => {
											return (
												<li key={idx} className="">
													{item}
												</li>
											);
										})
									: "-"}
							</ul>
						</div>
					</div>

					<div className="flex flex-col gap-4 p-3">
						<BasicLabel
							label="Jumlah Pegawai"
							className="w-full flex flex-row"
							labelClassName="w-1/3"
							value={<p>: {rowData?.list_pegawai?.length || 0}</p>}
						/>
						<ol className="list-decimal ml-4">
							{rowData?.list_pegawai?.length
								? rowData?.list_pegawai?.map((item, idx) => {
										return (
											<li key={idx}>
												<div className="flex flex-col">
													<p>{item?.nama_pegawai}</p>
												</div>
											</li>
										);
									})
								: ""}
						</ol>
					</div>

					<DialogFooter className="flex gap-2 flex-row justify-end">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsShow(false)}
						>
							Tutup
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
