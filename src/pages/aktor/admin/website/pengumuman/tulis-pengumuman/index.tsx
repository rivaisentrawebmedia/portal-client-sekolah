import { ArrowBack } from "@/components/common/ArrowBack";
import {
	useGetKategoriPengumuman,
	useGetTagPengumuman,
	usePostPengumuman,
} from "../list-pengumuman/controller";
import { Form } from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, Save, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { FormUploadGambar } from "./FormUploadGambar";
import {
	InputCommon,
	SelectCommon,
	TextEditorCommon,
} from "@/components/common/basic-input";

export default function TulisPengumumanPage() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostPengumuman();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const { data: kategoriPengumumanOptions, loading: loadingPengumuman } =
		useGetKategoriPengumuman();

	const { data: tagPengumumanOptions, loading: loadingTag } =
		useGetTagPengumuman();

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 w-full"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
						<ArrowBack
							link={`/admin/website/pengumuman?${params?.toString()}`}
							title="Tulis Pengumuman"
							background="#F5F9FF"
							border="#F5F9FF"
							text="#276CCD"
						/>

						<div className="flex gap-2 flex-col md:flex-row">
							<Button
								type="button"
								className="border-[#276CCD] text-[#276CCD] hover:bg-[#276CCD] hover:text-white"
								onClick={() => {
									navigate(`/admin/website/pengumuman/tulis-pengumuman`);
								}}
								variant={"outline"}
							>
								<X />
								Batal
							</Button>
							<Button
								type="submit"
								className="bg-[#276CCD] hover:bg-[#276CCD]"
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
									} else {
										form.setValue("status", "draft");
									}
								}}
							>
								<Save />
								Simpan Draft
							</Button>
							<Separator orientation="vertical" className="hidden md:block" />
							<Button
								type="submit"
								className="bg-[#276CCD] hover:bg-[#276CCD]"
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
									} else {
										form.setValue("status", "publish");
									}
								}}
							>
								<ArrowUpFromLine />
								Publish Sekarang
							</Button>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<InputCommon
							form={form}
							name="judul"
							disabled={disabled}
							label="Judul*"
							placeholder="Judul"
							className="flex flex-col gap-2 md:flex-row"
							labelClassname="w-full md:w-1/4"
						/>
						<InputCommon
							form={form}
							name="tanggal"
							disabled={disabled}
							label="Tanggal*"
							className="flex flex-col gap-2 md:flex-row"
							labelClassname="w-full md:w-1/4"
							type="date"
						/>
						<SelectCommon
							form={form}
							name="kategori_pengumuman_id"
							disabled={disabled || loadingPengumuman}
							label="Kategori Pengumuman*"
							placeholder="Pilih kategori Pengumuman"
							className="flex flex-col gap-2 md:flex-row"
							labelClassName="w-full md:w-1/4"
							selectClassName="flex-1"
							isLoading={loadingPengumuman}
							options={
								kategoriPengumumanOptions?.map((item) => {
									return {
										label: item?.nama,
										value: item?.id,
									};
								}) || []
							}
						/>
						<SelectCommon
							form={form}
							name="tag"
							disabled={disabled || loadingTag}
							label="Tag Pengumuman*"
							placeholder="Pilih tag pengumuman"
							className="flex flex-col gap-2 md:flex-row"
							labelClassName="w-full md:w-1/4"
							selectClassName="flex-1"
							isLoading={loadingTag}
							isMulti={true}
							options={
								tagPengumumanOptions?.map((item) => {
									return {
										label: item?.nama,
										value: item?.id,
									};
								}) || []
							}
						/>
						<TextEditorCommon
							form={form}
							name="isi"
							disabled={disabled}
							label="Isi*"
							placeholder="Masukkan isi pengumuman"
							className="flex flex-col gap-2 md:flex-row md:items-start"
							labelClassname="w-full md:w-1/4"
						/>
					</div>

					<FormUploadGambar disabled={disabled} form={form} />
				</form>
			</Form>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Tulis Pengumuman</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan pengumuman ini?
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
							className="bg-[#276CCD] hover:bg-[#276CCD]"
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
