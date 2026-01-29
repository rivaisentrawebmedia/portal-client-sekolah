import type { SuratTugas } from "../model";
import { Trash2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteSuratTugas } from "../controller";
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

export function ButtonDelete({ rowData }: { rowData?: SuratTugas }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteSuratTugas();

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
						<DialogTitle>Hapus Surat Tugas</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Surat Tugas ini?
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F5F9FF]">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tanggal Surat</p>
							<p className="flex-1">
								{selected?.tanggal_surat
									? dayjs(selected?.tanggal_surat)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"}
							</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Nomor Surat</p>
							<p className="flex-1">{selected?.format_nomor_surat || "-"}</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Kegiatan</p>
							<p className="flex-1">{selected?.kegiatan || "-"}</p>
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
