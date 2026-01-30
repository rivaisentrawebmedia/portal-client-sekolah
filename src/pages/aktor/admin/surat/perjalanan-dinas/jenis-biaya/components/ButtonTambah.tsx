import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostJenisBiaya } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormJenisBiaya } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostJenisBiaya();

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
				Tambah Jenis Biaya
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Jenis Biaya</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Jenis Biaya ini?
						</DialogDescription>
					</DialogHeader>

					<FormJenisBiaya
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
