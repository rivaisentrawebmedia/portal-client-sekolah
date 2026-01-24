import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePostHariLibur } from "../controller";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormHariLibur } from "./FormData";

export function ButtonTambah() {
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostHariLibur();

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
				Tambah Hari Libur
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah Hari Libur</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menambah Hari Libur ini?
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
