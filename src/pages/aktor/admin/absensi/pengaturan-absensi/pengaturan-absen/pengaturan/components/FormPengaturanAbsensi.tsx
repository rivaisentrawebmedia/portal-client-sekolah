import type { UseFormReturn } from "react-hook-form";
import type { PengaturanAbsensiFormValues } from "../model";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";
import { InputCommon } from "@/components/common/basic-input";

export function FormPengaturanAbsensi({
	disabled,
	form,
}: {
	form: UseFormReturn<PengaturanAbsensiFormValues>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<RadioCommon
					form={form}
					name="is_wajib_foto"
					disabled={disabled}
					label="Wajib Foto*"
					labelClassname=" w-full"
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
				<RadioCommon
					form={form}
					name="is_wajib_realisasi_kegiatan"
					disabled={disabled}
					label="Wajib Realisasi Kegiatan*"
					labelClassname=" w-full"
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
				<RadioCommon
					form={form}
					name="is_wajib_isi_rencana_kegiatan"
					disabled={disabled}
					label="Wajib Isi Rencana Kegiatan*"
					labelClassname=" w-full"
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
				<RadioCommon
					form={form}
					name="is_wajib_presensi_dilokasi"
					disabled={disabled}
					label="Wajib Presensi Dilokasi*"
					labelClassname=" w-full"
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
					name="cuti_tahunan"
					disabled={disabled}
					label="Cuti Tahunan*"
					placeholder="Cuti Tahunan"
					className="flex flex-col  gap-2"
					labelClassname=" w-full"
					type="number"
				/>
			</div>
		</>
	);
}
