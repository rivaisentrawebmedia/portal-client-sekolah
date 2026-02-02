import type { UseFormReturn } from "react-hook-form";
import type { TentangSekolahFormValues } from "../../../../model";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";
import { PenyelenggaraOptions } from "@/const/listPenyelenggara";

export function FormOperasionalKontak({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<TentangSekolahFormValues>;
}) {
	return (
		<>
			<div className="flex items-center gap-2">
				<p className="text-nowrap text-[#276CCD] font-medium">
					Operasional & Kontak
				</p>
				<div className="border-t flex-1" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SelectCommon
					name="penyelenggaraan"
					label="Penyelenggaraan"
					placeholder="Pilih Penyelenggaraan"
					form={form}
					disabled={disabled}
					options={PenyelenggaraOptions}
					isMulti
				/>

				<div className="flex flex-col gap-2">
					<p
						style={{
							fontWeight: "lighter",
							letterSpacing: "1px",
						}}
					>
						Waktu Penyelenggaraan
					</p>
					<div className="flex gap-2 items-center">
						<InputCommon
							name="jam_mulai"
							form={form}
							disabled={disabled}
							className="flex-1"
							type="time"
						/>
						<p className="text-[#276CCD]">s.d</p>
						<InputCommon
							name="jam_selesai"
							form={form}
							disabled={disabled}
							className="flex-1"
							type="time"
						/>
					</div>
				</div>
				<InputCommon
					name="alamat"
					label="Alamat"
					placeholder="Alamat"
					form={form}
					disabled={disabled}
				/>
				<InputCommon
					name="email"
					label="Email"
					placeholder="Email"
					form={form}
					disabled={disabled}
					type="email"
				/>
				<InputCommon
					name="telepon"
					label="Telepon"
					placeholder="Telepon"
					form={form}
					disabled={disabled}
				/>
			</div>
		</>
	);
}
