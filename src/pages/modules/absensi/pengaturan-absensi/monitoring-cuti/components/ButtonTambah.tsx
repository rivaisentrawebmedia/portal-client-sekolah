import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostMonitoringCuti } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormMonitoringCuti } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } =
		usePostMonitoringCuti();

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
				Tambah Monitoring Cuti
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Monitoring Cuti</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Monitoring Cuti ini?
						</DialogDescription>
					</DialogHeader>

					<FormMonitoringCuti
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
