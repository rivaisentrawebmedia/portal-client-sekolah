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
import { Save, X } from "lucide-react";
import { useState } from "react";
import { usePostSasaranSekolah } from "./controller";
import { TextEditorCommon } from "@/components/common/basic-input";
import { useNavigate } from "react-router-dom";
import { FormItems, FormUploadPhoto } from "../edit-hasil/components";

export function EditSasaranPage() {
	const navigate = useNavigate();
	const { disabled, form, isShow, onSubmit, setIsShow } =
		usePostSasaranSekolah();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const [isShowBatal, setIsShowBatal] = useState<boolean>(false);
	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 p-4"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex md:justify-between gap-4">
						<p className="text-lg text-[#245192] font-medium">Edit Sasaran</p>
						<div className="flex items-center gap-2">
							<Button
								type="button"
								className="border-[#245192] text-[#245192] hover:text-[#245192]"
								variant={"outline"}
								onClick={() => {
									setIsShowBatal(true);
								}}
							>
								<X size={12} />
								Batal Edit
							</Button>
							<Button
								type="submit"
								className="bg-[#245192] text-white hover:bg-[#245192]/80"
							>
								<Save />
								Simpan
							</Button>
						</div>
					</div>
					<>
						<FormUploadPhoto
							disabled={disabled}
							form={form}
							label="Photo"
							name="gambar"
						/>
						<TextEditorCommon
							form={form}
							name="isi"
							disabled={disabled}
							label="Isi*"
							placeholder="Masukkan isi"
							className="flex flex-col gap-2"
						/>
						<FormItems form={form} isLoading={disabled} label="Sasaran" />
					</>
				</form>
			</Form>

			<Dialog open={isShowBatal} onOpenChange={setIsShowBatal}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Batal Ubah Sasaran Sekolah</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin membatalkan perubahan Sasaran sekolah ini?
							Data yang diubah tidak akan disimpan dan hilang
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
								setIsShowBatal(false);
								navigate("/admin/website/profil-sekolah/tentang-sekolah");
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
						<DialogTitle>Ubah Sasaran Sekolah</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan perubahan Sasaran sekolah ini?
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
							className="bg-[#245192] text-white hover:bg-[#245192]/80"
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
