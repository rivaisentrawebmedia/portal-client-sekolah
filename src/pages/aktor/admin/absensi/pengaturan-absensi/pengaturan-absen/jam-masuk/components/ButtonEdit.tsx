import { Pencil } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormDaftarJamMasuk } from "./FormData";
import type { JamMasuk } from "../model";
import { usePostJamMasuk } from "../controller";

export function ButtonEdit({ rowData }: { rowData?: JamMasuk | null }) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected, selected } =
		usePostJamMasuk();

	return (
		<>
			<div className="flex items-center justify-center">
				<button
					type="button"
					disabled={rowData?.is_libur}
					onClick={() => {
						setSelected(rowData || null);
						setIsShow(true);
					}}
					className="bg-[#CDA327] disabled:bg-[#CDA327]/50 flex items-center gap-2 py-1.5 px-3 rounded-md text-white"
				>
					<Pencil size={12} />
					Edit
				</button>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] md:max-w-[50%] overflow-auto max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Jam mMasuk</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Jam Masuk pada hari{" "}
							{selected?.hari} ?
						</DialogDescription>
					</DialogHeader>

					<FormDaftarJamMasuk
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
