import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FaKeyboard } from "react-icons/fa";
import { useUpdateGantiPassword } from "../controller";
import { FormResetPassword } from "./FormDataResetPassword";

export function ButtonGantiPassword() {
	const { disabled, form, isShow, onSubmit, setIsShow } =
		useUpdateGantiPassword();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					setIsShow(true);
				}}
				className="bg-transparent text-sm rounded-full text-[#1E5916] border-[#1E5916]"
			>
				<FaKeyboard size={12} />
				Reset Password
			</Button>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%] rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Reset Password</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah password? Anda akan keluar dan
							diminta login ulang menggunakan password baru
						</DialogDescription>
					</DialogHeader>

					<FormResetPassword
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
