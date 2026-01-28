import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostBagianSurat } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormBagianSurat } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostBagianSurat();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					setIsShow(true);
				}}
				className="bg-transparent text-sm rounded-full border-[#161646]"
			>
				<Plus size={12} />
				Tambah Bagian Surat
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[80%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Bagian Surat</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Bagian Surat ini?
						</DialogDescription>
					</DialogHeader>

					<FormBagianSurat
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
