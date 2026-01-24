import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Pencil, Save, X } from "lucide-react";

import { useState } from "react";
import { useUpdateVisiMisi } from "./controller";
import { DetailVisiMisi, FormVisiMisi } from "./components";

export default function VisiMisiOrgasasiPage() {
	const {
		disabled,
		form,
		isShow,
		loadingProfil,
		onSubmit,
		selected,
		setIsShow,
		isEdit,
		setIsEdit,
	} = useUpdateVisiMisi();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const [isShowBatal, setIsShowBatal] = useState<boolean>(false);
	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex md:justify-between gap-4">
						<p className="text-lg text-[#1E5916] font-medium">
							Visi, Misi, Tujuan
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
										<Pencil />
										Edit Profil
									</Button>
								</>
							)}
						</div>
					</div>
					{isEdit ? (
						<>
							<FormVisiMisi disabled={disabled} form={form} />
						</>
					) : (
						<>
							<DetailVisiMisi data={selected} loading={loadingProfil} />
						</>
					)}
				</form>
			</Form>

			<Dialog open={isShowBatal} onOpenChange={setIsShowBatal}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Batal Ubah Visi Misi Organisasi</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin membatalkan perubahan visi misi organisasi
							ini? Data yang diubah tidak akan disimpan dan hilang
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="flex gap-2 justify-end">
						<Button
							type="button"
							variant="outline"
							disabled={disabled}
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
							disabled={disabled}
						>
							Ya, Saya Yakin
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Ubah Visi Misi Organisasi</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan perubahan visi misi organisasi
							ini?
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
