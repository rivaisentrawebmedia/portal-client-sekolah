import { InputCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Map } from "@/components/ui/map";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export function FormDaftarLokasi({
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
	const longitude = form.watch("longtitude");
	const latitude = form.watch("latitude");

	const lat = Number(latitude);
	const lng = Number(longitude);

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputCommon
						form={form}
						name="nama"
						disabled={disabled}
						label="Nama Lokasi*"
						placeholder="Nama Lokasi"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>

					<InputCommon
						form={form}
						name="radius"
						disabled={disabled}
						label="Radius Presensi (meter)*"
						placeholder="Radius"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>
					<InputCommon
						form={form}
						name="longtitude"
						disabled={disabled}
						label="Longtitude*"
						placeholder="Longtitude"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>

					<InputCommon
						form={form}
						name="latitude"
						disabled={disabled}
						label="Latitude*"
						placeholder="Latitude"
						className="flex flex-col  gap-2"
						labelClassname=" w-full"
					/>
				</div>

				{Number.isFinite(lat) && Number.isFinite(lng) && (
					<Map latitude={lat} longitude={lng} />
				)}

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
