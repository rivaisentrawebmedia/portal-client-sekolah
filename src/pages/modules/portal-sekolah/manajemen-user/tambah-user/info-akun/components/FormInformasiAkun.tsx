import { InputCommon } from "@/components/common/basic-input";
import type { UseFormReturn } from "react-hook-form";
import type { ManajemenUserFormValues } from "../../../list-user/model";

export function FormInformasiAkun({
	disabled,
	form,
}: {
	form: UseFormReturn<ManajemenUserFormValues>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-3">
				<InputCommon
					form={form}
					name="email"
					disabled={disabled}
					label="Email*"
					placeholder="Email"
					className="flex flex-col gap-2 md:flex-row"
					type="email"
					labelClassname="w-full md:w-1/5"
				/>
				<InputCommon
					form={form}
					name="password"
					disabled={disabled}
					label="Password*"
					placeholder="Password"
					className="flex flex-col gap-2 md:flex-row"
					type="password"
					labelClassname="w-full md:w-1/5"
				/>
				<InputCommon
					form={form}
					name="konfirmasi_password"
					disabled={disabled}
					label="Konfirmasi Password*"
					placeholder="Konfirmasi Password"
					className="flex flex-col gap-2 md:flex-row"
					type="password"
					labelClassname="w-full md:w-1/5"
				/>
			</div>
		</>
	);
}
