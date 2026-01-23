import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostPeriodeCuti } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormPeriodeCuti } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostPeriodeCuti();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					setIsShow(true);
				}}
				className="bg-transparent text-sm rounded-full text-[#1E5916] border-[#1E5916]"
			>
				<Plus size={12} />
				Tambah Periode Cuti
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Periode Cuti</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Periode Cuti ini?
						</DialogDescription>
					</DialogHeader>

					<FormPeriodeCuti
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
