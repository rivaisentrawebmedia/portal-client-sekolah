import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { usePostManajemenUser } from "../../list-user/controller";
import {
	FormInformasiAkun,
	FormInformasiClient,
	FormInformasiPegawai,
} from "./components";

export default function TambahInformasiAkunPage() {
	const { disabled, form, isShow, onSubmit, setIsShow } =
		usePostManajemenUser();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col w-full gap-4"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex flex-col gap-4 md:flex-row md:items-center ">
						<p className="text-nowrap text-[#1E5916]">Informasi Akun</p>
						<hr className="border-t w-full" />
						<div className="flex items-center gap-2">
							<Button
								onClick={async () => {
									const isValid = await form.trigger();
									if (!isValid) {
										const invalidFields = Object.entries(
											form.formState.errors,
										).map(([field, error]) => ({
											field,
											error: error?.message,
										}));
										return toast.error(invalidFields?.[0]?.error?.toString());
									}
								}}
								type="submit"
								className="rounded-full gap-1 text-xs"
								variant={"default"}
							>
								<ArrowRight size={16} />
								Lanjutkan
							</Button>
						</div>
					</div>

					<FormInformasiAkun disabled={disabled} form={form} />

					<div className="flex flex-col gap-4 md:flex-row md:items-center ">
						<p className="text-nowrap text-[#1E5916]">Informasi User</p>
						<hr className="border-t w-full" />
					</div>

					<FormInformasiClient disabled={disabled} form={form} />

					<div className="flex flex-col gap-4 md:flex-row md:items-center ">
						<p className="text-nowrap text-[#1E5916]">Informasi Pegawai</p>
						<hr className="border-t w-full" />
					</div>

					<FormInformasiPegawai disabled={disabled} form={form} />
					<div className="flex items-center justify-end gap-2">
						<Button
							onClick={async () => {
								const isValid = await form.trigger();
								if (!isValid) {
									const invalidFields = Object.entries(
										form.formState.errors,
									).map(([field, error]) => ({
										field,
										error: error?.message,
									}));
									return toast.error(invalidFields?.[0]?.error?.toString());
								}
							}}
							type="submit"
							className="rounded-full gap-1 text-xs"
							variant={"default"}
						>
							<ArrowRight size={16} />
							Lanjutkan
						</Button>
					</div>
				</form>
			</Form>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tambah client</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan informasi akun ini?
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
