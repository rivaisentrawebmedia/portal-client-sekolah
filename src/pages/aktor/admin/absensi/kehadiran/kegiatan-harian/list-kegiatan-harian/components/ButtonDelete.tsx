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
import type { KegiatanHarian } from "../model";
import { useDeleteKegiatanHarian } from "../controller";
import { convertFromSnakeCase } from "@/utils/helpers";

export function ButtonDelete({ rowData }: { rowData?: KegiatanHarian }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteKegiatanHarian();

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
						<DialogTitle>Hapus Kegiatan Harian</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Kegiatan Harian ini?
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F6FFF5] border border-[#9EDAA0] rounded-md">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tanggal</p>
							<p className="flex-1">
								{selected?.tanggal
									? dayjs(selected?.tanggal).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Jam Masuk</p>
							<p className="flex-1">
								{selected?.jam_masuk?.slice(0, 5) || "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Jam Keluari</p>
							<p className="flex-1">
								{selected?.jam_keluar?.slice(0, 5) || "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Pekerjaan</p>
							<p className="flex-1">{selected?.pekerjaan || "-"}</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Status</p>
							<p className="flex-1">
								{convertFromSnakeCase(selected?.status || "") || "-"}
							</p>
						</div>

						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Valid</p>
							<p className="flex-1">
								{selected?.valid ? "Valid" : "Tidak Valid"}
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
