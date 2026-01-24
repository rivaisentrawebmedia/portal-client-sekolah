import { CheckboxCommon, InputCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export function FormHariLibur({
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
	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<InputCommon
					form={form}
					name="nama"
					disabled={disabled}
					label="Nama*"
					placeholder="Nama"
					className="flex flex-col  gap-2"
					labelClassname=" w-full"
				/>

				<div className="flex flex-col  gap-2">
					<p
						style={{
							fontWeight: "lighter",
							letterSpacing: "1px",
						}}
					>
						Tanggal Berlaku*
					</p>
					<div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
						<InputCommon
							form={form}
							name="tanggal_mulai"
							disabled={disabled}
							className="md:w-1/3 w-full"
							type="date"
						/>
						{form.watch("is_lebih_sehari") && (
							<>
								<p>s.d</p>
								<InputCommon
									form={form}
									name="tanggal_akhir"
									disabled={disabled}
									className="w-full md:w-1/3"
									type="date"
								/>
							</>
						)}
						<CheckboxCommon
							form={form}
							name="is_lebih_sehari"
							disabled={disabled}
							label="Lebih dari 1 hari*"
							className="flex flex-col  gap-2"
							labelClassname=" w-full"
						/>
					</div>
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
