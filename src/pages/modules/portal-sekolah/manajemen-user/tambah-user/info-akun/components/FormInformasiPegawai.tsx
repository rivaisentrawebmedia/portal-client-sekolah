import type { UseFormReturn } from "react-hook-form";
import { SelectCommon } from "@/components/common/basic-input";
import { useGetReferensi } from "@/const/listReferensi";
import { StatusMenikahOptions } from "@/const/listStatusMenikah";

export function FormInformasiPegawai({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;

	disabled: boolean;
}) {
	const { data: statusAktifOptions, loading: loadingStatusAktif } =
		useGetReferensi({
			url: "status-aktif",
		});
	const { data: golonganDarahOptions, loading: loadingGolonganDarah } =
		useGetReferensi({
			url: "golongan-darah",
		});
	const { data: agamaOptions, loading: loadingAgama } = useGetReferensi({
		url: "agama",
	});
	const { data: sukuOptions, loading: loadingSuku } = useGetReferensi({
		url: "suku",
	});
	const { data: pangkatGolonganOptions, loading: loadingPangkatGolongan } =
		useGetReferensi({
			url: "pangkat-golongan",
		});
	const { data: jenisKTKOptions, loading: loadingJenisKTK } = useGetReferensi({
		url: "jenis-ktk",
	});
	const { data: jenisKepegawaianOptions, loading: loadingJenisKepegawaian } =
		useGetReferensi({
			url: "jenis-kepegawaian",
		});

	return (
		<>
			<div className="flex flex-col gap-3">
				<SelectCommon
					form={form}
					name="status_menikah"
					disabled={disabled}
					label="Status Menikah*"
					placeholder="Pilih Status Menikah"
					isMulti={false}
					options={StatusMenikahOptions}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="jenis_kepegawaian_id"
					disabled={disabled || loadingJenisKepegawaian}
					label="Jenis Kepegawaian*"
					placeholder="Pilih Jenis Kepegawaian"
					isLoading={loadingJenisKepegawaian}
					isMulti={false}
					options={
						jenisKepegawaianOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="jenis_ktk_id"
					disabled={disabled || loadingJenisKTK}
					label="Jenis KTK*"
					placeholder="Pilih Jenis KTK"
					isLoading={loadingJenisKTK}
					isMulti={false}
					options={
						jenisKTKOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="pangkat_golongan_id"
					disabled={disabled || loadingPangkatGolongan}
					label="Pangkat / Golongan*"
					placeholder="Pilih Pangkat / Golongan"
					isLoading={loadingPangkatGolongan}
					isMulti={false}
					options={
						pangkatGolonganOptions?.map((item) => {
							return {
								label: `${item?.nama_pangkat} - ${item?.nama_golongan}`,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="suku_id"
					disabled={disabled || loadingSuku}
					label="Suku*"
					placeholder="Pilih Suku"
					isLoading={loadingSuku}
					isMulti={false}
					options={
						sukuOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="agama_id"
					disabled={disabled || loadingAgama}
					label="Agama*"
					placeholder="Pilih Agama"
					isLoading={loadingAgama}
					isMulti={false}
					options={
						agamaOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="golongan_darah_id"
					disabled={disabled || loadingGolonganDarah}
					label="Golongan Darah*"
					placeholder="Pilih Golongan Darah"
					isLoading={loadingGolonganDarah}
					isMulti={false}
					options={
						golonganDarahOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<SelectCommon
					form={form}
					name="status_aktif_id"
					disabled={disabled || loadingStatusAktif}
					label="Status Aktif*"
					placeholder="Pilih Status Aktif"
					isLoading={loadingStatusAktif}
					isMulti={false}
					options={
						statusAktifOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="w-full md:w-1/5"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>
			</div>
		</>
	);
}
