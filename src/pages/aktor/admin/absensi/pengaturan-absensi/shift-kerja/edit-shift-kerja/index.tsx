import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Save, X } from "lucide-react";
import { useUpdateShiftKerja } from "../list-shift-kerja/controller";
import { InputCommon } from "@/components/common/basic-input";
import {
	FormPengaturan,
	FormShiftKerja,
	FormTambahShift,
} from "../tambah-shift-kerja/components";

export default function EditShiftKerjaPage() {
	const navigate = useNavigate();

	const { form, disabled, isShow, onSubmit, setIsShow } = useUpdateShiftKerja();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Shift Kerja",
							to: `/admin/presensi/pengaturan-absensi/shift-kerja`,
						},
						{
							label: "Eddit Shift Kerja",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">
						Edit Shift Kerja
					</p>
				</div>

				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={form.handleSubmit(onSubmitFunc)}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-6">
								<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
									<InputCommon
										form={form}
										name="nama"
										disabled={disabled}
										label="Nama Shift*"
										placeholder="Nama Shift"
									/>
								</div>
							</div>
						</div>

						<FormPengaturan disabled={disabled} form={form} />
						<FormShiftKerja disabled={disabled} form={form} />
						<FormTambahShift loading={disabled} form={form} />

						<div className="flex items-center justify-end gap-2">
							<Button
								type="button"
								variant={"outline"}
								onClick={() => {
									navigate(-1);
								}}
								className="gap-1 text-xs"
							>
								<X />
								Batal
							</Button>
							<Button
								onClick={async () => {
									const isValid = await form.trigger();

									if (!isValid) {
										const message = getFirstErrorMessage(form.formState.errors);

										return toast.error(message ?? "Form masih belum valid");
									}
								}}
								type="submit"
								className="gap-1 text-xs"
								variant={"default"}
							>
								<Save size={16} />
								Simpan
							</Button>
						</div>
					</form>
				</Form>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Edit Shift Kerja</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah Shift Kerja berikut ini?
						</DialogDescription>
					</DialogHeader>

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
							type="button"
							onClick={() => {
								onSubmit();
							}}
							variant="default"
							disabled={disabled}
						>
							Simpan
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

const getFirstErrorMessage = (errors: any): string | null => {
	if (!errors) return null;

	// error langsung (string)
	if (typeof errors.message === "string") {
		return errors.message;
	}

	// array (jam_kerja)
	if (Array.isArray(errors)) {
		for (const item of errors) {
			const msg = getFirstErrorMessage(item);
			if (msg) return msg;
		}
	}

	// object (nested field)
	if (typeof errors === "object") {
		for (const key of Object.keys(errors)) {
			const msg = getFirstErrorMessage(errors[key]);
			if (msg) return msg;
		}
	}

	return null;
};
