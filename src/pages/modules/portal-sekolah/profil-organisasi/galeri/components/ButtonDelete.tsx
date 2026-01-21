import type { Galeri } from "../model";
import { Trash2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteGaleri } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ButtonDelete({ rowData }: { rowData?: Galeri }) {
	const { disabled, setIsShow, setSelected, handleDelete, isShow, selected } =
		useDeleteGaleri();

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
						<DialogTitle>Hapus Galeri</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menghapus Galeri ini?
						</DialogDescription>
					</DialogHeader>

					<img
						src={selected?.gambar}
						alt="Galeri"
						className="w-full rounded-full"
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
