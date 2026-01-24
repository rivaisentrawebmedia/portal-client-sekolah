import { BasicLabel } from "@/components/common/BasicLabel";
import type { Profile } from "../model";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProfile } from "../controller";
import { FormProfile } from "./FormData";

export function DetailDataAkun({
	dataProfil,
}: {
	dataProfil: Profile | undefined;
}) {
	const { disabled, form, isShow, onSubmit, setIsShow, setSelected } =
		useUpdateProfile();

	return (
		<>
			<div className="flex gap-4 justify-between">
				<p className="text-primary font-medium text-lg">Data Akun</p>
				<Button
					type="button"
					className=" rounded-full border-primary text-primary"
					variant={"outline"}
					onClick={() => {
						setSelected(dataProfil || null);
						setIsShow(true);
					}}
				>
					<Pencil />
					Edit Profil
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<BasicLabel label="Nama Lengkap" value={dataProfil?.nama} />
				<BasicLabel label="Email" value={dataProfil?.email} />
				<BasicLabel label="username" value={dataProfil?.username} />
				<BasicLabel
					label="Level Akses"
					value={dataProfil?.is_superadmin ? "Superadmin" : "Admin"}
				/>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[50%]  rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Jabatan</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Jabatan ini?
						</DialogDescription>
					</DialogHeader>

					<FormProfile
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
