import type { UseFormReturn } from "react-hook-form";
import { FormUploadPhoto } from "./FormUploadPhoto";
import {
	InputCommon,
	InpuTTanggalLahir,
	TextareaCommon,
} from "@/components/common/basic-input";

export function FormInformasiClient({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;

	disabled: boolean;
}) {
	return (
		<>
			<FormUploadPhoto
				name="photo"
				disabled={disabled}
				form={form}
				label="Foto Profil"
			/>
			<div className="flex flex-col gap-3">
				<InputCommon
					form={form}
					name="nama"
					disabled={disabled}
					label="Nama Lengkap*"
					placeholder="Nama Lengkap"
					className="flex flex-col gap-2 md:flex-row"
					labelClassname="w-full md:w-1/5"
				/>
				<InputCommon
					form={form}
					name="no_telp"
					disabled={disabled}
					label="No. Telepon*"
					placeholder="No. Telepon"
					className="flex flex-col gap-2 md:flex-row"
					labelClassname="w-full md:w-1/5"
				/>

				<InputCommon
					form={form}
					name="nip"
					disabled={disabled}
					label="NIP"
					placeholder="NIP"
					className="flex flex-col gap-2 md:flex-row"
					labelClassname="w-full md:w-1/5"
				/>
				<InputCommon
					form={form}
					name="tempat_lahir"
					disabled={disabled}
					label="Tempat Lahir*"
					placeholder="Tempat Lahir*"
					className="flex flex-col gap-2 md:flex-row"
					labelClassname="w-full md:w-1/5"
				/>

				<InpuTTanggalLahir
					className="flex flex-col gap-2 md:flex-row"
					labelClassname="w-full md:w-1/5"
					label="Tanggal Lahir*"
					form={form}
				/>

				<TextareaCommon
					form={form}
					name="alamat"
					disabled={disabled}
					label="Alamat Tempat Tinggal*"
					placeholder="Alamat Tempat Tinggal"
					className="flex flex-col gap-2 md:flex-row md:items-start"
					labelClassname="w-full md:w-1/5"
				/>
			</div>
		</>
	);
}
