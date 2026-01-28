import { InputCommon } from "@/components/common/basic-input";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { useFormatSurat } from "../controller/useFormatNoSurat";

export function FormBagianSurat({
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
	const segments = useFormatSurat(form);

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputCommon
						form={form}
						name="nama"
						disabled={disabled}
						label="Nama Bagian Surat*"
						placeholder="Nama bagian surat"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
					/>
					<div className="hidden md:block" />
					<InputCommon
						form={form}
						name="kode_depan"
						disabled={disabled}
						label="Kode Depan*"
						placeholder="Kode Depan"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
					/>
					<InputCommon
						form={form}
						name="urutan_kode_depan"
						disabled={disabled}
						label="Urutan*"
						placeholder="Urutan"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						type="number"
					/>
					<div className="hidden md:block" />
					<InputCommon
						form={form}
						name="urutan_nomor"
						disabled={disabled}
						label="Posisi Urutan No. Surat*"
						placeholder="Posisi Urutan No. Surat"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						type="number"
					/>
					<InputCommon
						form={form}
						name="kode_belakang"
						disabled={disabled}
						label="Kode Belakang*"
						placeholder="Kode Belakang"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
					/>

					<InputCommon
						form={form}
						name="urutan_kode_belakang"
						disabled={disabled}
						label="Urutan*"
						placeholder="Urutan"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						type="number"
					/>

					<RadioCommon
						form={form}
						name="perlu_bulan"
						disabled={disabled}
						label="Apakah Perlu Bulan?*"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						options={[
							{
								label: "Ya",
								value: true,
							},
							{
								label: "Tidak",
								value: false,
							},
						]}
					/>
					<InputCommon
						form={form}
						name="urutan_bulan"
						disabled={disabled}
						label="Urutan*"
						placeholder="Urutan"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
					/>
					<RadioCommon
						form={form}
						name="is_bulan_romawi"
						disabled={disabled}
						label="Apakah Bulan Romawi?*"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						options={[
							{
								label: "Ya",
								value: true,
							},
							{
								label: "Tidak",
								value: false,
							},
						]}
					/>
					<div className="hidden md:block" />

					<RadioCommon
						form={form}
						name="perlu_tahun"
						disabled={disabled}
						label="Apakah Perlu Tahun?*"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
						options={[
							{
								label: "Ya",
								value: true,
							},
							{
								label: "Tidak",
								value: false,
							},
						]}
					/>
					<InputCommon
						form={form}
						name="urutan_tahun"
						disabled={disabled}
						label="Urutan*"
						placeholder="Urutan"
						className="flex flex-col gap-2 md:flex-row"
						labelClassname="w-full md:w-1/3"
					/>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					{segments.map((s, idx) => (
						<span key={s.key} className="flex items-center gap-2">
							<span
								className={
									s.key === "nomor" ? "font-bold text-red-600" : "font-medium"
								}
							>
								{s.value}
							</span>

							{idx < segments.length - 1 && (
								<span className="text-zinc-400">/</span>
							)}
						</span>
					))}
				</div>

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
						className="bg-[#161646] hover:bg-[#161646]"
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
