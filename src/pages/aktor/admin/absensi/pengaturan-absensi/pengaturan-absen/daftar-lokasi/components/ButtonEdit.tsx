import type { DaftarLokasi } from "../model";
import { Pencil } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateDaftarLokasi } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormDaftarLokasi } from "./FormData";

export function ButtonEdit({ rowData }: { rowData?: DaftarLokasi }) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateDaftarLokasi();

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
							className="bg-[#CDA327] p-1.5 rounded-md text-white"
						>
							<Pencil size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Edit data</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] md:max-w-[50%] overflow-auto max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Daftar Lokasi</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Daftar Lokasi ini?
						</DialogDescription>
					</DialogHeader>

					<FormDaftarLokasi
						disabled={disabled}
						form={form}
						onSubmit={onSubmit}
						setIsShow={setIsShow}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
