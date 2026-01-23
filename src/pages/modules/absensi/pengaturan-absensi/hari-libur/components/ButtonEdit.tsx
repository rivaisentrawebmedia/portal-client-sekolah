import type { HariLibur } from "../model";
import { Pencil } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateHariLibur } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormHariLibur } from "./FormData";

export function ButtonEdit({ rowData }: { rowData?: HariLibur }) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateHariLibur();

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
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Hari Libur</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Hari Libur ini?
						</DialogDescription>
					</DialogHeader>

					<FormHariLibur
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
