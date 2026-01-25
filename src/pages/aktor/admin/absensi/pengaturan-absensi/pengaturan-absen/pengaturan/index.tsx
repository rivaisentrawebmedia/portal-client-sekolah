import { Save, Settings, X } from "lucide-react";
import { usePostPengaturanAbsensi } from "./controller";
import { Form } from "@/components/ui/form";
import { FormPengaturanAbsensi, LabelPengaturanAbsensi } from "./components";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function PengaturanAbsensiSection() {
	const {
		form,
		disabled: loading,
		isShow,
		onSubmit,
		setIsShow,
		selected: pengaturan,
		isEdit,
		setIsEdit,
	} = usePostPengaturanAbsensi();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const [isShowBatal, setIsShowBatal] = useState<boolean>(false);

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 p-4 bg-white rounded-md border border-primary"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex justify-between gap-4">
						<p className="text-lg text-[#1E5916] font-medium">
							Pengaturan Absensi
						</p>
						<div className="flex items-center gap-2">
							{isEdit ? (
								<>
									<Button
										type="button"
										className="border-primary rounded-full text-primary hover:text-primary"
										variant={"outline"}
										onClick={() => {
											setIsShowBatal(true);
										}}
									>
										<X size={12} />
										Batal Edit
									</Button>
									<Button type="submit" className="rounded-full">
										<Save />
										Simpan
									</Button>
								</>
							) : (
								<>
									<Button
										type="button"
										onClick={() => {
											setIsEdit(true);
										}}
										className="border-primary text-primary rounded-full hover:text-primary"
										variant={"outline"}
									>
										<Settings />
										Edit Setting
									</Button>
								</>
							)}
						</div>
					</div>
					{isEdit ? (
						<FormPengaturanAbsensi form={form} disabled={loading} />
					) : (
						<LabelPengaturanAbsensi data={pengaturan} loading={loading} />
					)}
				</form>
			</Form>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Ubah Pengaturan Absensi</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin mengubah pengaturan absensi berikut ini?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="flex gap-2 justify-end">
						<Button
							type="button"
							variant="outline"
							disabled={loading}
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
							disabled={loading}
						>
							Simpan
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isShowBatal} onOpenChange={setIsShowBatal}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Batal Ubah pengaturan absensi</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin membatalkan perubahan pengaturan absensi
							ini? Data yang diubah tidak akan disimpan dan hilang
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="flex gap-2 justify-end">
						<Button
							type="button"
							variant="outline"
							disabled={loading}
							onClick={() => setIsShowBatal(false)}
						>
							Batal
						</Button>

						<Button
							type="button"
							onClick={() => {
								setIsEdit(false);
								setIsShowBatal(false);
							}}
							variant="destructive"
							disabled={loading}
						>
							Ya, Saya Yakin
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
