import type { Mading } from "../model";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePostStatusStatusMading } from "../controller";

export function ButtonKembaliKeDraft({ rowData }: { rowData?: Mading }) {
	const { disabled, setIsShow, isShow, onSubmit, setCheckedPool } =
		usePostStatusStatusMading();

	return (
		<>
			<button
				type="button"
				onClick={() => {
					setCheckedPool([rowData?.id || ""]);
					setIsShow(true);
				}}
				className="border-[#276CCD] text-nowrap text-[#276CCD] border py-1 px-2 rounded-full"
			>
				Kembali Ke Draft
			</button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Kembali Ke Draft</DialogTitle>
						<DialogDescription>
							Anda akan mengembalikan Mading ke draft dan Mading tidak dapat
							dibaca oleh pengunjung website. Apakah anda yakin untuk
							melanjutkan?
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 p-3 bg-[#F5F9FF]">
						<div className="flex flex-col font-sans text-sm rounded-md md:flex-row md:items-center md:gap-2">
							<p className="w-full md:w-1/3 text-[#888]">Judul Mading</p>
							<p className="flex-1">{rowData?.judul || "-"}</p>
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
							onClick={() => {
								onSubmit("draft");
							}}
							disabled={disabled}
							className="bg-[#276CCD] hover:bg-[#276CCD]"
						>
							Kembalikan Ke Draft
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
