import { Pencil } from "lucide-react";
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
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { convertFromSnakeCase } from "@/utils/helpers";
import dayjs from "dayjs";
import { FormRiwayatKehadiranPerBulan } from "./FormData";
import { useUpdateRiwayatKehadiran } from "../../detail-riwayat-kehadiran/controller";
import type { RiwayatKehadiranPerBulan } from "../../detail-riwayat-kehadiran/model";

export function ButtonEdit({
	rowData,
}: {
	rowData?: RiwayatKehadiranPerBulan;
}) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected, selected } =
		useUpdateRiwayatKehadiran();

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
				<DialogContent className="w-[95vw] overflow-auto max-w-md md:max-w-[50%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>
							Edit Riwayat Kehadiran{" "}
							{convertFromSnakeCase(selected?.hari || "")}/
							{selected?.tanggal
								? dayjs(selected?.tanggal).locale("id").format("DD-MM-YYYY")
								: ""}
						</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Kehadiran ini?
						</DialogDescription>
					</DialogHeader>

					<FormRiwayatKehadiranPerBulan
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
