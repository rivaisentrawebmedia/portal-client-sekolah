import { TextEditorCommon } from "@/components/common/basic-input";
import type { UseFormReturn } from "react-hook-form";

export function FormVisiMisi({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-2">
				{/* VISI */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Visi</p>
					<hr className="border-t w-full" />
				</div>

				<TextEditorCommon
					form={form}
					name="visi"
					disabled={disabled}
					placeholder="Visi"
					minHeight={80}
				/>
			</div>

			<div className="flex flex-col gap-2">
				{/* MISI */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Misi</p>
					<hr className="border-t w-full" />
				</div>

				<TextEditorCommon
					form={form}
					name="misi"
					disabled={disabled}
					placeholder="Misi"
				/>
			</div>

			<div className="flex flex-col gap-2">
				{/* TUJUAN */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<p className="text-nowrap text-[#1E5916]">Tujuan</p>
					<hr className="border-t w-full" />
				</div>

				<TextEditorCommon
					form={form}
					name="tujuan"
					disabled={disabled}
					placeholder="Tujuan"
				/>
			</div>
		</>
	);
}
