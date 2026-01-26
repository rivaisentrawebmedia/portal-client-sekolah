import type { UseFormReturn } from "react-hook-form";
import { InputCommon } from "@/components/common/basic-input";
import type { KegiatanHarianFormValues } from "../../list-kegiatan-harian/model";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";
import { convertFromSnakeCase } from "@/utils/helpers";

export function FormData({
	disabled,
	form,
}: {
	form: UseFormReturn<KegiatanHarianFormValues>;
	disabled: boolean;
}) {
	return (
		<>
			<InputCommon
				form={form}
				name="pekerjaan"
				disabled={disabled}
				label="Pekerjaan*"
				placeholder="Pekerjaan"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
			/>

			<InputCommon
				form={form}
				name="tanggal"
				disabled={disabled}
				label="Tanggal*"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
				type="date"
			/>

			<InputCommon
				form={form}
				name="jam_masuk"
				disabled={disabled}
				label="Jam Masuk*"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
				type="time"
			/>

			<InputCommon
				form={form}
				name="jam_keluar"
				disabled={disabled}
				label="Jam Keluar*"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
				type="time"
			/>

			<RadioCommon
				form={form}
				name="status"
				disabled={disabled}
				label="Status*"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
				options={["selesai", "proses", "tidak_hadir"]?.map((item) => {
					return {
						label: convertFromSnakeCase(item),
						value: item,
					};
				})}
			/>

			<RadioCommon
				form={form}
				name="valid"
				disabled={disabled}
				label="Valid*"
				className="flex flex-col gap-2"
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
		</>
	);
}
