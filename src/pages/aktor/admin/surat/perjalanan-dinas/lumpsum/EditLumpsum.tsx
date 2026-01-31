import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { useGetLumpsumSPPDByID, usePostLumpsumSPPD } from "./controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";
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
import { LoadingSpinner } from "@/components/ui/loading";
import { SelectCommon } from "@/components/common/basic-input";
import {
	useGetSuratTugasJabatan,
	useGetSuratTugasPenandatangan,
} from "../surat-tugas/list-surat-tugas/controller";
import { useGetAnggaran } from "../anggaran/controller";
import { FormBiaya } from "./components";
import { toast } from "react-toastify";
import { Save } from "lucide-react";

export default function UbahListLumpsumPage() {
	const { fivethPathname, eightthPathname } = usePathname();
	const [params] = useSearchParams();
	const { data, loading } = useGetLumpsumSPPDByID();

	const { disabled, form, isShow, onSubmit, setIsShow } = usePostLumpsumSPPD();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const { data: userOptions, loading: loadingUser } =
		useGetSuratTugasPenandatangan({
			page: 1,
		});

	const { data: jabatanOptions, loading: loadingJabatan } =
		useGetSuratTugasJabatan({
			page: 1,
		});

	const { data: anggaranOptions, loading: loadingAnggaran } = useGetAnggaran({
		page: 1,
	});

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
					<ArrowBack
						link={`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail/lumpsum/${eightthPathname}/detail-lumpsum?${params?.toString()}`}
						title="Ubah Lumpsum"
						background="#F5F9FF"
						border="#F5F9FF"
						text="#161646"
					/>
				</div>

				{loading ? (
					<LoadingSpinner />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#eff6ff] border border-[#161646] rounded-md p-3">
						<BasicLabel
							label="Nama Pegawai"
							value={data?.pegawai_nama || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="NIP Pegawai"
							value={data?.pegawai_nip || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Nama Pejabat"
							value={data?.pejabat_nama || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="NIP Pejabat"
							value={data?.pejabat_nip || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Nama Bendahara"
							value={data?.bendahara_nama || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="NIP Bendahara"
							value={data?.bendahara_nip || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Jabatan Pejabat"
							value={data?.jabatan_pejabat || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Jabatan Bendahara"
							value={data?.jabatan_bendahara || "-"}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
						<BasicLabel
							label="Tanggal"
							value={
								<p>
									{data?.tanggal_keberangkatan
										? dayjs(data?.tanggal_keberangkatan)
												.locale("id")
												.format("DD MMMM YYYY")
										: ""}{" "}
									s.d{" "}
									{data?.tanggal_kepulangan
										? dayjs(data?.tanggal_kepulangan)
												.locale("id")
												.format("DD MMMM YYYY")
										: ""}
								</p>
							}
							className="flex flex-row gap-2"
							labelClassName="w-1/3"
						/>
					</div>
				)}

				<Form {...form}>
					<form
						className="flex flex-col gap-4 bg-[#eff6ff] border border-[#161646] rounded-md p-3"
						onSubmit={form.handleSubmit(onSubmitFunc)}
					>
						<p className="font-medium">Daftar Biaya</p>
						<SelectCommon
							form={form}
							name="pejabat_id"
							label="Pejabat"
							placeholder="Pilih Opsi"
							className="flex flex-col w-full gap-2 md:flex-row md:gap-4"
							labelClassName="w-full md:w-1/4"
							selectClassName="flex-1"
							disabled={disabled}
							isLoading={loadingUser}
							options={userOptions?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
						/>

						<SelectCommon
							form={form}
							name="jabatan_pejabat_id"
							options={jabatanOptions?.map((item) => {
								return {
									label: `${item?.nama}`,
									value: item?.id,
								};
							})}
							className="flex flex-col w-full gap-2 md:flex-row md:gap-4"
							labelClassName="w-full md:w-1/4"
							disabled={disabled}
							isLoading={loadingJabatan}
							label="Jabatan Pejabat"
							placeholder="Pilih Jabatan"
							selectClassName="flex-1"
						/>

						<SelectCommon
							form={form}
							name="bendahara_id"
							options={userOptions
								?.filter((list) => list?.jabatan?.toLowerCase() === "bendahara")
								?.map((item) => {
									return {
										label: `${item?.nama}`,
										value: item?.id,
									};
								})}
							className="flex flex-col w-full gap-2 md:flex-row md:gap-4"
							labelClassName="w-full md:w-1/4"
							disabled={disabled}
							isLoading={loadingUser}
							label="Bendahara"
							placeholder="Pilih Bendahara"
							selectClassName="flex-1"
						/>

						<SelectCommon
							form={form}
							name="jabatan_bendahara_id"
							options={jabatanOptions
								?.filter((list) => list?.nama?.toLowerCase() === "bendahara")
								?.map((item) => {
									return {
										label: `${item?.nama}`,
										value: item?.id,
									};
								})}
							className="flex flex-col w-full gap-2 md:flex-row md:gap-4"
							labelClassName="w-full md:w-1/4"
							disabled={disabled}
							isLoading={loadingJabatan}
							label="Jabatan"
							placeholder="Pilih Jabatan"
							selectClassName="flex-1"
						/>

						<SelectCommon
							form={form}
							name="sumber_dana_id"
							options={anggaranOptions?.map((item) => {
								return {
									label: `${item?.nama}`,
									value: item?.id,
								};
							})}
							className="flex flex-col w-full gap-2 md:flex-row md:gap-4"
							labelClassName="w-full md:w-1/4"
							disabled={disabled}
							isLoading={loadingAnggaran}
							label="Sumber Dana"
							placeholder="Pilih Sumber Dana"
							selectClassName="flex-1"
						/>

						<FormBiaya form={form} isLoading={disabled} />

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

										console.log(invalidFields);

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
						<DialogTitle>Edit Lumpsum</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin menyimpan lumpsum ini?
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
