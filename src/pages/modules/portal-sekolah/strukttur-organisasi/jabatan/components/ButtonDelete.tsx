import type { Jabatan } from "../model";
import { Trash2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteJabatan } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/utils/helpers";
import dayjs from "dayjs";

export function ButtonDelete({ rowData }: { rowData?: Jabatan }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteJabatan();

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
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Hapus Jabatan</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Jabatan ini?
						</DialogDescription>
					</DialogHeader>

					<div className="flex gap-2 p-3 bg-[#F6FFF5] border border-[#9EDAA0] rounded-md">
						{selected?.pejabat_photo ? (
							<img
								src={selected?.pejabat_photo}
								alt=""
								className="w-9 h-9 rounded-full"
							/>
						) : (
							<div className="flex items-center w-9 h-9 justify-center bg-primary rounded-full text-white">
								{getInitials(selected?.pejabat_nama || "")}
							</div>
						)}
						<div className="flex flex-col">
							<p>{selected?.pejabat_nama || "-"}</p>
							<p className="text-xs text-[#2769CD]">
								{selected?.pejabat_nip || "-"}
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Kelompok</p>
							<p className="flex-1">{selected?.kelompok_jabatan || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Nama Jabatan</p>
							<p className="flex-1">{selected?.nama || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Pimpinan Utama?</p>
							<p className="flex-1">{selected?.is_utama ? "Ya" : "Tidak"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">
								Guru Mata Pelajaran?
							</p>
							<p className="flex-1">{selected?.is_mapel ? "Ya" : "Tidak"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Wali Kelas?</p>
							<p className="flex-1">{selected?.is_walas ? "Ya" : "Tidak"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">TMT</p>
							<p className="flex-1">
								{selected?.mulai
									? dayjs(selected?.mulai).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">
								Tanggal Akhir Menjabat
							</p>
							<p className="flex-1">
								{selected?.selesai
									? dayjs(selected?.selesai).locale("id").format("DD-MM-YYYY")
									: "-"}
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
