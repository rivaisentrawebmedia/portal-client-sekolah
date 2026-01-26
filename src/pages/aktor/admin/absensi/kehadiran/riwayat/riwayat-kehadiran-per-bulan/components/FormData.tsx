import {
	InputCommon,
	SelectCommon,
	TextEditorCommon,
} from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { JenisPresensiOptions } from "@/const/listJenisPresensi";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { FormUploadPhoto } from "./FormUploadPhoto";

export function FormRiwayatKehadiranPerBulan({
	form,
	disabled,
	onSubmit,
	setIsShow,
}: {
	form: UseFormReturn<any>;
	onSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined,
	) => Promise<void>;
	disabled: boolean;
	setIsShow: (value: React.SetStateAction<boolean>) => void;
}) {
	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputCommon
						form={form}
						name="tanggal"
						disabled={disabled}
						label="Tanggal*"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
						type="date"
					/>
					<SelectCommon
						form={form}
						name="jenis_presensi"
						disabled={disabled}
						label="Jenis Presensi*"
						placeholder="Pilih jenis presensi"
						isMulti={false}
						options={JenisPresensiOptions}
						className="flex flex-col  gap-2"
						labelClassName=" w-full"
						selectClassName="flex-1"
					/>
					<InputCommon
						form={form}
						name="jam_datang"
						disabled={disabled}
						label="Jam Datang*"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
						type="time"
					/>
					<InputCommon
						form={form}
						name="jam_pulang"
						disabled={disabled}
						label="Jam Pulang*"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
						type="time"
					/>
					<InputCommon
						form={form}
						name="lokasi_datang"
						disabled={disabled}
						label="Lokasi Datang*"
						placeholder="Lokasi Datang"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>
					<InputCommon
						form={form}
						name="lokasi_pulang"
						disabled={disabled}
						label="Lokasi Pulang*"
						placeholder="Lokasi Pulang"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>
				</div>

				<TextEditorCommon
					form={form}
					name="rencana_pekerjaan"
					disabled={disabled}
					label="Rencana Pekerjaan"
					placeholder="Rencanan Pekerjaan"
					minHeight={80}
				/>

				<TextEditorCommon
					form={form}
					name="realisasi_pekerjaan"
					label="Realisasi Pekerjaan"
					disabled={disabled}
					placeholder="Realisasi Pekerjaan"
					minHeight={80}
				/>

				<FormUploadPhoto name="photo" form={form} disabled={disabled} />

				<DialogFooter className="flex gap-2 justify-end">
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						onClick={() => setIsShow(false)}
					>
						Batal
					</Button>

					<Button
						onClick={async () => {
							const isValid = await form.trigger();
							if (!isValid) {
								const invalidFields = Object.entries(form.formState.errors).map(
									([field, error]) => ({
										field,
										error: error?.message,
									}),
								);
								console.log(invalidFields);

								return toast.error(invalidFields?.[0]?.error?.toString());
							}
						}}
						type="submit"
						variant="default"
						disabled={disabled}
					>
						Simpan
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
