import type { UseFormReturn } from "react-hook-form";
import type { ShiftKerjaFormValues } from "../../list-shift-kerja/model";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";

export function FormShiftKerja({
	form,
	disabled,
}: {
	form: UseFormReturn<ShiftKerjaFormValues>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="space-y-6">
				<div className="rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-4 border-slate-200 bg-white p-6 shadow-sm">
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
						name="is_wajib_presensi_di_lokasi"
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
				</div>
			</div>
		</>
	);
}
