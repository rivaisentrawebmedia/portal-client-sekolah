import { Eye, Save } from "lucide-react";
import { useState } from "react";
import { usePostKopSurat } from "./controller";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogPreview, FormKopSurat, FormUploadPhoto } from "./components";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function KopSuratDesa() {
	const {
		form,
		disabled,
		isShow,
		onSubmit,
		setIsShow,
		selected: data,
	} = usePostKopSurat();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

	return (
		<>
			<div className="flex flex-col h-fit gap-0 border rounded-md flex-1">
				<hr className="border-t w-full" />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmitFunc)}
						className="flex flex-col gap-0"
					>
						<div className="flex md:items-center md:flex-row flex-col gap-4 md:justify-between border-b p-4">
							<h1 className="text-xl font-semibold text-portal-violet">
								Kop Surat Sekolah
							</h1>

							<div className="flex items-center gap-3">
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => setIsShowPreview(true)}
								>
									<Eye className="mr-2 h-4 w-4" />
									Preview
								</Button>

								<Button type="submit" size="sm">
									<Save className="mr-2 h-4 w-4" />
									Simpan
								</Button>
							</div>
						</div>
						{/* Content */}
						{disabled ? (
							<div className="flex flex-col items-center justify-center py-4">
								<div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
								<p className="text-sm text-gray-500">Memuat data…</p>
							</div>
						) : (
							<div className="flex flex-col gap-4 p-4">
								<FormUploadPhoto
									form={form}
									disabled={disabled}
									label="Logo"
									name="logo"
								/>

								{[1, 2, 3, 4, 5, 6].map((i) => (
									<FormKopSurat
										key={i}
										form={form}
										loading={disabled}
										title={`Urutan ${i}`}
										gaya={`gaya_font_${i}`}
										isi={`isi_${i}`}
										jenis={`jenis_font_${i}`}
										ukuran={`ukuran_font_${i}`}
									/>
								))}
							</div>
						)}
					</form>
				</Form>
			</div>

			<Dialog open={isShowPreview} onOpenChange={setIsShowPreview}>
				<DialogContent className="w-[95vw] max-w-md md:max-w-[70%] overflow-auto rounded-lg p-4 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Preview Kop Surat</DialogTitle>
					</DialogHeader>

					{data && <DialogPreview data={data} />}
				</DialogContent>
			</Dialog>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Ubah Kop Surat</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan perubahan kop surat ini?
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
