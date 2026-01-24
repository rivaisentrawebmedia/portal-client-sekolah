import { InputCommon } from "@/components/common/basic-input";
import type { UseFormReturn } from "react-hook-form";

export function FormKontak({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<p className="text-nowrap text-[#1E5916]">Kontak</p>
				<hr className="border-t w-full" />
			</div>

			<InputCommon
				form={form}
				name="no_telp"
				disabled={disabled}
				label="Telepon*"
				placeholder="Telepon"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
			/>

			<InputCommon
				form={form}
				name="email"
				disabled={disabled}
				label="Email*"
				placeholder="Email"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				type="email"
			/>

			<InputCommon
				form={form}
				name="url_web"
				disabled={disabled}
				label="URL Web*"
				placeholder="URL Web"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				type="url"
			/>

			<InputCommon
				form={form}
				name="url_portal_sekolah"
				disabled={disabled}
				label="URL Portal Sekolah*"
				placeholder="URL Portal Sekolah"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				type="url"
			/>
		</>
	);
}
