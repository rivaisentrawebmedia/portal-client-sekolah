import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostAnggaran } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormAnggaran } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostAnggaran();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					setIsShow(true);
				}}
				className="bg-transparent text-sm rounded-full text-[#161646] border-[#161646]"
			>
				<Plus size={12} />
				Tambah Anggaran
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Anggaran</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Anggaran ini?
						</DialogDescription>
					</DialogHeader>

					<FormAnggaran
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
