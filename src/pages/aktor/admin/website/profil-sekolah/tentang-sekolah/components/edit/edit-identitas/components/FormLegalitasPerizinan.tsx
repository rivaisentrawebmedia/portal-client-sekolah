import type { UseFormReturn } from "react-hook-form";
import type { TentangSekolahFormValues } from "../../../../model";
import { InputCommon } from "@/components/common/basic-input";

export function FormLegalitasPerizinan({
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
					Legalitas & Perizinan
				</p>
				<div className="border-t flex-1" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<InputCommon
					name="sk_pendirian"
					label="SK Pendirian"
					placeholder="SK Pendirian"
					form={form}
					disabled={disabled}
				/>
				<InputCommon
					name="tanggal_sk_pendirian"
					label="Tgl. SK Pendirian"
					form={form}
					disabled={disabled}
					type="date"
				/>
				<InputCommon
					name="sk_operasional"
					label="SK Operasional"
					placeholder="SK Operasional"
					form={form}
					disabled={disabled}
				/>
				<InputCommon
					name="tanggal_sk_operasional"
					label="Tgl. SK Operasional"
					form={form}
					disabled={disabled}
					type="date"
				/>
			</div>
		</>
	);
}
