import { InputCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export function FormKelompok({
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
					className="flex flex-col md:flex-row md:items-center gap-2"
					labelClassname="md:w-1/3 w-full"
				/>

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
