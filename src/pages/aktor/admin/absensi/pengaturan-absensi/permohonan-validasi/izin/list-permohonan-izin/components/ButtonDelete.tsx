import { Trash2 } from "lucide-react";
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
import type { PermohonanIzin } from "../model";
import { useDeletePermohonanIzin } from "../controller";
import { convertFromSnakeCase } from "@/utils/helpers";

export function ButtonDelete({ rowData }: { rowData?: PermohonanIzin }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeletePermohonanIzin();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								setSelected(rowData || null);
								setIsShow(true);
							}}
							className="bg-[#CD2738] p-1.5 rounded-md text-white"
						>
							<Trash2 size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Hapus data</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Hapus Permohonan Izin</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapusPermohonan Izin ini?
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F6FFF5] border border-[#9EDAA0] rounded-md">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Nama Pegawai</p>
							<p className="flex-1">{selected?.nama || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tgl. Diajukan</p>
							<p className="flex-1">
								{selected?.tanggal_diajukan
									? dayjs(selected?.tanggal_diajukan)
											.locale("id")
											.format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Jenis Izin</p>
							<p className="flex-1">{selected?.jenis_izin || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Keperluan</p>
							<p className="flex-1">{selected?.alasan_izin || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Periode Izin</p>
							<p className="flex-1">
								{selected?.mulai
									? dayjs(selected?.mulai).locale("id").format("DD-MM-YYYY")
									: "-"}{" "}
								s.d{" "}
								{selected?.selesai
									? dayjs(selected?.selesai).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Status</p>
							<p className="flex-1">
								{convertFromSnakeCase(selected?.status || "") || "-"}
							</p>
						</div>
					</div>

					<DialogFooter className="flex gap-2 flex-row justify-end">
						<Button
							type="button"
							variant="outline"
							disabled={disabled}
							onClick={() => setIsShow(false)}
						>
							Batal
						</Button>
						<Button
							type="button"
							variant="destructive"
							onClick={() => {
								handleDelete();
							}}
							disabled={disabled}
						>
							Hapus
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
