import type { Jabatan } from "../model";
import { Pencil } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateJabatan } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormJabatan } from "./FormData";

export function ButtonEdit({ rowData }: { rowData?: Jabatan }) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateJabatan();

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
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%]  rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Jabatan</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Jabatan ini?
						</DialogDescription>
					</DialogHeader>

					<FormJabatan
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
