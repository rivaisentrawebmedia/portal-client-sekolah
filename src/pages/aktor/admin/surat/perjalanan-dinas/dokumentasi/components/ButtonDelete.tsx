import type { DokumentasiSPPD } from "../model";
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
import { useDeleteDokumentasiSPPD } from "../controller/useDelete";

export function ButtonDelete({ rowData }: { rowData?: DokumentasiSPPD }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteDokumentasiSPPD();

	return (
		<>
			<div className="absolute top-0 left-0 p-2 w-full flex justify-end">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type="button"
								onClick={() => {
									setSelected(rowData || null);
									setIsShow(true);
								}}
								className="bg-[#CD2738] absolute p-1.5 rounded-md text-white"
							>
								<Trash2 size={12} />
							</button>
						</TooltipTrigger>
						<TooltipContent>Hapus data</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md overflow-auto rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Hapus Dokumentasi SPPD</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Dokumentasi SPPD ini?
						</DialogDescription>
					</DialogHeader>

					<img
						src={selected?.file_url}
						alt="Dokumentasi SPPD"
						className="w-full"
					/>

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
