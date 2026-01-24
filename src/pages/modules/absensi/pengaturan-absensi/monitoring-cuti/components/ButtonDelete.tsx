import type { MonitoringCuti } from "../model";
import { Trash2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteMonitoringCuti } from "../controller";
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

export function ButtonDelete({ rowData }: { rowData?: MonitoringCuti }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteMonitoringCuti();

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
						<DialogTitle>Hapus Monitoring Cuti</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Monitoring Cuti ini?
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F6FFF5] border border-[#9EDAA0] rounded-md">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Monitoring Cuti</p>
							<p className="flex-1">{selected?.nama || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Kode</p>
							<p className="flex-1">{selected?.kode || "-"}</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tgl. Mulai</p>
							<p className="flex-1">
								{selected?.mulai
									? dayjs(selected?.mulai).locale("id").format("DD-MM-YYYY")
									: "-"}
							</p>
						</div>
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Tgl. Berakhir</p>
							<p className="flex-1">
								{selected?.akhir
									? dayjs(selected?.akhir).locale("id").format("DD-MM-YYYY")
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
