import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { MenubarItem } from "@/components/ui/menubar";
import { FormResetPassword } from "@/pages/aktor/admin/portal-admin/profile/components/FormDataResetPassword";
import { useUpdateGantiPassword } from "@/pages/aktor/admin/portal-admin/profile/controller";
import { FaKeyboard } from "react-icons/fa";

export function ButtonGantiPassword() {
	const { disabled, form, isShow, onSubmit, setIsShow } =
		useUpdateGantiPassword();

	return (
		<>
			<MenubarItem asChild>
				<button
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setIsShow(true);
					}}
					className="flex w-full items-center gap-2"
				>
					<FaKeyboard color="#CDA327" />
					Reset Password
				</button>
			</MenubarItem>

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
