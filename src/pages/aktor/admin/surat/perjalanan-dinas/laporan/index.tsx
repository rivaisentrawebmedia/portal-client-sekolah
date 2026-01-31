import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading";
import { usePostLaporanSPPD } from "./controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import { useGetSuratTugasByID } from "../surat-tugas/list-surat-tugas/controller";
import { useGetSPP } from "../sppd/list-sppd/controller";
import dayjs from "dayjs";
import { Form } from "@/components/ui/form";
import { InputCommon, TextareaCommon } from "@/components/common/basic-input";
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
import { Save } from "lucide-react";
import { ButtonCetakLaporan, FormLaporanPelaksanaan } from "./components";
import { useGetKopSurat } from "../../pengaturan/kop-surat/kop-sekolah/controller";
import { useGetProfilOrganisasi } from "../../../portal-admin/profil-organisasi/profil/controller";

export default function DetailLaporanSPPDPage() {
	const [params] = useSearchParams();
	const { fivethPathname } = usePathname();

	const { data: dataSuratTugas, loading: loadingSuratTugas } =
		useGetSuratTugasByID();
	const { data: dataSPPD, loading: loadingSPPD } = useGetSPP();

	const {
		disabled,
		form,
		isShow,
		onSubmit,
		setIsShow,
		loading: loadingLaporan,
		selected,
	} = usePostLaporanSPPD();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const loading = loadingLaporan || loadingSPPD || loadingSuratTugas;

	const { data: dataKopSurat } = useGetKopSurat();
	const { data: dataProfil } = useGetProfilOrganisasi();

	if (loading) {
		return <LoadingSpinner className="min-h-[80vh]" />;
	}

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
					<ArrowBack
						link={`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail?${params?.toString()}`}
						title="Detail Laporan SPPD"
						background="#F5F9FF"
						border="#F5F9FF"
						text="#161646"
					/>

					{dataKopSurat && dataProfil && selected && (
						<ButtonCetakLaporan
							data={selected}
							kopSurat={dataKopSurat}
							profil={dataProfil}
						/>
					)}
				</div>

				<div className="flex flex-col gap-0 border rounded-md">
					<div className="grid grid-cols-1 bg-[#f0f8ff] rounded-t-md p-3 md:grid-cols-2 gap-4">
						<BasicLabel
							label="No. Surat Tugas"
							value={dataSuratTugas?.format_nomor_surat || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Tanggal Surat"
							value={
								dataSuratTugas?.tanggal_surat
									? dayjs(dataSuratTugas?.tanggal_surat)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f4f9f6] p-3 grid-cols-1 md:grid-cols-2 gap-4">
						<BasicLabel
							label="No. SPPD"
							value={dataSPPD?.format_nomor_surat || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Tanggal SPPD"
							value={
								dataSPPD?.tanggal_surat
									? dayjs(dataSPPD?.tanggal_surat)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f0f8ff] p-3 grid-cols-1 md:grid-cols-2 gap-4">
						<BasicLabel
							label="Tanggal Mulai Kegiatan"
							value={
								dataSuratTugas?.tanggal_mulai
									? dayjs(dataSuratTugas?.tanggal_mulai)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Tanggal Selesai Kegiatan"
							value={
								dataSuratTugas?.tanggal_selesai
									? dayjs(dataSuratTugas?.tanggal_selesai)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f4f9f6] p-3 grid-cols-1 md:grid-cols-2 gap-4">
						<BasicLabel
							label="Maksud Perjalanan Dinas"
							value={dataSPPD?.maksud_kegiatan || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f0f8ff] p-3 grid-cols-1 md:grid-cols-2 gap-4">
						<BasicLabel
							label="Tempat Kegiatan"
							value={dataSuratTugas?.tempat_kegiatan || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f4f9f6] p-3 grid-cols-1 md:grid-cols-2 gap-4">
						<BasicLabel
							label="Penandatangan Surat"
							value={dataSuratTugas?.penandatangan || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
					<div className="grid bg-[#f0f8ff] p-3 grid-cols-1 rounded-b-md md:grid-cols-2 gap-4">
						<BasicLabel
							label="Yang Ditugaskan"
							value={"-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
				</div>

				<Form {...form}>
					<form
						className="flex flex-col gap-4 rounded-md bg-blue-50 border border-[#8a8aa2] p-4"
						onSubmit={form.handleSubmit(onSubmitFunc)}
					>
						<InputCommon
							form={form}
							name="tempat"
							label="Tempat"
							placeholder="Tempat"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>
						<InputCommon
							form={form}
							name="tanggal"
							label="Tanggal"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
							type="date"
						/>
						<InputCommon
							form={form}
							name="perihal"
							label="Perihal"
							placeholder="Perihal"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>
						<TextareaCommon
							form={form}
							name="isi"
							label="Isi"
							placeholder="Masukkan isi disini"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>
						<TextareaCommon
							form={form}
							name="dasar_pelaksanaan"
							label="Dasar Pelaksanaan"
							placeholder="Masukkan dasar pelaksanaan disini"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>

						<FormLaporanPelaksanaan form={form} isLoading={disabled} />

						<InputCommon
							form={form}
							name="tindak_lanjut"
							label="Tindak Lanjut"
							placeholder="Tindak Lanjut"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>
						<TextareaCommon
							form={form}
							name="saran"
							label="Saran"
							placeholder="Saran"
							className="flex flex-col gap-2 md:flex-row md:gap-4"
							labelClassname="w-full md:w-1/4"
							disabled={disabled}
						/>

						<div className="flex justify-end gap-2">
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
					</form>
				</Form>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Ubah Laporan Surat Tugas</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan laporan surat tugas ini?
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
