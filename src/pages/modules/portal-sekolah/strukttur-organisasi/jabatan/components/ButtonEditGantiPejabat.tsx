import type { RiwayatPejabat } from "../model";
import { useUpdateGantiPejabat } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormGantiPejabat } from "./FormDataGantiPejabat";
import { Button } from "@/components/ui/button";
import { JokoSwapHoriz } from "@/assets/icons/JokoSwapHoriz";

export function ButtonEditGantiPejabat({
	rowData,
}: {
	rowData?: RiwayatPejabat;
}) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateGantiPejabat();

	return (
		<>
			<Button
				type="button"
				className="border-[#1E5916] justify-start w-full text-[#1E5916]"
				variant="outline"
				onClick={() => {
					setSelected(rowData || null);
					setIsShow(true);
				}}
			>
				<JokoSwapHoriz />
				Ganti Pejabat
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%]  rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Ganti Pejabat</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah pejabat ini?
						</DialogDescription>
					</DialogHeader>

					<FormGantiPejabat
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
