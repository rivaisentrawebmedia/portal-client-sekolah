import { ArrowBack } from "@/components/common/ArrowBack";
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
import { Save, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	useGetSuratTugasJabatan,
	useGetSuratTugasPenandatangan,
	usePostSuratTugas,
} from "../list-surat-tugas/controller";
import {
	FormDasarSuratTugas,
	FormKegiatan,
	FormNoSurat,
	FormPilihPegawai,
} from "./components";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";

export default function BuatSuratTugasPage() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { disabled, form, isShow, onSubmit, setIsShow } = usePostSuratTugas();
	const jabatan_penandatangan_id = form.watch("jabatan_penandatangan_id");

	const { data: jabatanOptions, loading: loadingJabatan } =
		useGetSuratTugasJabatan({
			page: 1,
		});
	const { data: penandatanganOptions, loading: loadingPenandatangan } =
		useGetSuratTugasPenandatangan({
			page: 1,
			jabatan_id: jabatan_penandatangan_id,
		});

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 w-full"
					onSubmit={form.handleSubmit(onSubmitFunc)}
				>
					<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
						<ArrowBack
							link={`/admin/surat/perjalanan-dinas/surat-tugas-spd?${params?.toString()}`}
							title="Buat Surat Tugas"
							background="#F5F9FF"
							border="#F5F9FF"
							text="#161646"
						/>

						<div className="flex gap-2 flex-col md:flex-row">
							<Button
								type="button"
								className="border-[#161646] text-[#161646] hover:bg-[#161646] hover:text-white"
								onClick={() => {
									navigate(`/admin/surat/perjalanan-dinas/surat-tugas-spd`);
								}}
								variant={"outline"}
							>
								<X />
								Batal
							</Button>
							<Button
								type="submit"
								className="bg-[#161646] hover:bg-[#161646]"
								onClick={async () => {
									const isValid = await form.trigger();
									if (!isValid) {
										const invalidFields = Object.entries(
											form.formState.errors,
										).map(([field, error]: any) => {
											const message =
												error?.message ??
												error?.root?.message ??
												error?.[0]?.message ??
												"Field tidak valid";

											return { field, error: message };
										});

										return toast.error(invalidFields?.[0]?.error?.toString());
									}
								}}
							>
								<Save />
								Simpan Surat Tugas
							</Button>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<FormNoSurat form={form} isDisabled={disabled} />

						<FormDasarSuratTugas form={form} isLoading={disabled} />

						<FormKegiatan form={form} isLoading={disabled} />

						<p>Surat Tugas ini berlaku pada tanggal dibawah ini:</p>

						<div className="w-full flex flex-col md:flex-row gap-2">
							<p
								style={{
									fontWeight: "lighter",
									letterSpacing: "1px",
								}}
								className="w-full md:w-1/4"
							>
								Tanggal Mulai Kegiatan
							</p>
							<div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
								<InputCommon
									form={form}
									name="tanggal_mulai"
									className="flex-1"
									disabled={disabled}
									labelClassname="w-full"
									type="date"
								/>
								<p>s.d</p>
								<InputCommon
									form={form}
									name="tanggal_selesai"
									className="flex-1"
									disabled={disabled}
									labelClassname="w-full"
									type="date"
								/>
							</div>
						</div>

						<InputCommon
							form={form}
							name="tempat_kegiatan"
							placeholder="Tempat Kegiatan"
							className="w-full flex flex-col md:flex-row gap-2"
							disabled={disabled}
							label="Tempat Kegiatan"
							labelClassname="w-full md:w-1/4"
						/>

						<SelectCommon
							form={form}
							name="jabatan_penandatangan_id"
							options={jabatanOptions?.map((item) => {
								return {
									label: `${item?.nama}`,
									value: item?.id,
								};
							})}
							className="w-full flex flex-col md:flex-row gap-2"
							labelClassName="w-full md:w-1/4"
							disabled={disabled}
							isLoading={loadingJabatan}
							label="Jabatan"
							placeholder="Pilih Jabatan"
							selectClassName="flex-1"
						/>

						<SelectCommon
							form={form}
							key={`penandatangan_id-${jabatan_penandatangan_id}`}
							name="penandatangan_id"
							options={penandatanganOptions?.map((item) => {
								return {
									label: `${item?.nama}`,
									value: item?.id,
								};
							})}
							className="w-full flex flex-col md:flex-row gap-2"
							labelClassName="w-full md:w-1/4"
							disabled={disabled || !jabatan_penandatangan_id}
							isLoading={loadingPenandatangan}
							label="Penandatangan"
							placeholder="Pilih Penandatangan"
							selectClassName="flex-1"
						/>

						<FormPilihPegawai form={form} disabled={disabled} />
					</div>
				</form>
			</Form>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Buat Surat Tugas</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan surat tugas ini?
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
							className="bg-[#161646] hover:bg-[#161646]"
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
