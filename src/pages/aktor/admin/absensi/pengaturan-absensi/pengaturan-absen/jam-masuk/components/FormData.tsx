import { InputCommon } from "@/components/common/basic-input";
import { BasicLabel } from "@/components/common/BasicLabel";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export function FormDaftarJamMasuk({
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
	const jamMasuk = form.watch("jam_masuk");
	const jamPulang = form.watch("jam_pulang");

	const isNextDay = jamMasuk && jamPulang && jamMasuk > jamPulang;

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<BasicLabel label="Hari" value={form.watch("hari")} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-4 border border-[#1e5916] bg-[#f2f8f3] p-4">
						<InputCommon
							form={form}
							name="jam_masuk"
							disabled={disabled}
							label="Jam Masuk*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
							type="time"
						/>
						<InputCommon
							form={form}
							name="jam_mulai_absen_masuk"
							disabled={disabled}
							label="Jam Mulai Absen Masuk*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
							type="time"
						/>
						<InputCommon
							form={form}
							name="jam_akhir_absen_masuk"
							disabled={disabled}
							label="Jam Akhir Absen Masuk*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
							type="time"
						/>
						<InputCommon
							form={form}
							name="toleransi_keterlambatan"
							disabled={disabled}
							label="Toleransi Keterlambatan*"
							placeholder="Toleransi Keterlambatan"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
						/>
					</div>

					<div className="flex flex-col gap-4 border border-[#1e5916] bg-[#f2f8f3] p-4">
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
							name="jam_mulai_absen_pulang"
							disabled={disabled}
							label="Jam Mulai Absen Pulang*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
							type="time"
						/>
						<InputCommon
							form={form}
							name="jam_akhir_absen_pulang"
							disabled={disabled}
							label="Jam Akhir Absen Pulang*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
							type="time"
						/>
						<InputCommon
							form={form}
							name="toleransi_pulang_cepat"
							disabled={disabled}
							label="Toleransi Pulang Cepat*"
							placeholder="Toleransi Pulang Cepat"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
						/>
					</div>
				</div>

				{isNextDay && (
					<p className="text-xs rounded-md border border-red-300 bg-red-50 p-3 text-red-500">
						*Jam pulang berada pada hari berikutnya
					</p>
				)}

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
