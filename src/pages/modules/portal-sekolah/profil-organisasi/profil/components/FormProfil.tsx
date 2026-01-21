import { InputCommon } from "@/components/common/basic-input";
import type { UseFormReturn } from "react-hook-form";
import { FormUploadPhoto } from "./FormUploadPhoto";

export function FormProfil({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<p className="text-nowrap text-[#1E5916]">Profil</p>
				<hr className="border-t w-full" />
			</div>

			<div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
				<FormUploadPhoto
					disabled={disabled}
					form={form}
					label="Logo Sekolah"
					name="photo_sekolah"
				/>
				<div className="flex flex-col gap-1 flex-1">
					<InputCommon
						form={form}
						name="nama_sekolah"
						disabled={disabled}
						label="Nama Sekolah*"
						placeholder="Nama Sekolah"
					/>
					<InputCommon
						form={form}
						name="npsn_sekolah"
						disabled={disabled}
						label="NPSN Sekolah*"
						placeholder="NPSN Sekolah"
					/>
				</div>
			</div>
		</>
	);
}
