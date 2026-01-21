import {
	InputCommon,
	SelectCommon,
	TextareaCommon,
} from "@/components/common/basic-input";
import { useGetReferensi } from "@/const/listReferensi";
import type { UseFormReturn } from "react-hook-form";

export function FormAlamatSekolah({
	form,
	disabled,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	const provinsi = form.watch("provinsi_id");
	const kabupaten = form.watch("kabupaten_id");
	const kecamatan = form.watch("kecamatan_id");

	const { data: provinsiData, loading: loadingProvinsi } = useGetReferensi({
		url: "provinsi",
	});
	const { data: kabupatenData, loading: loadingKabupaten } = useGetReferensi({
		url: "kabupaten",
		provinsi_id: provinsi,
	});
	const { data: kecamatanData, loading: loadingkecamatan } = useGetReferensi({
		url: "kecamatan",
		provinsi_id: provinsi,
		kabupaten_id: kabupaten,
	});

	const { data: kelurahanData, loading: loadingkelurahan } = useGetReferensi({
		url: "desa",
		provinsi_id: provinsi,
		kabupaten_id: kabupaten,
		kecamatan_id: kecamatan,
	});

	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<p className="text-nowrap text-[#1E5916]">Alamat Sekolah</p>
				<hr className="border-t w-full" />
			</div>

			<SelectCommon
				form={form}
				name="provinsi_id"
				disabled={disabled || loadingProvinsi}
				label="Provinsi"
				placeholder="Pilih Provinsi"
				isLoading={loadingProvinsi}
				isMulti={false}
				labelClassName="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				selectClassName="flex-1"
				options={
					provinsiData?.map((item) => {
						return {
							label: item?.nama,
							value: item?.id,
						};
					}) || []
				}
				fx={() => {
					form.setValue("kabupaten_id", undefined);
					form.setValue("kecamatan_id", undefined);
					form.setValue("desa_id", undefined);
				}}
			/>
			<SelectCommon
				key={`kabupaten_id-${provinsi}`}
				form={form}
				name="kabupaten_id"
				disabled={disabled || loadingKabupaten || !provinsi}
				selectClassName="flex-1"
				label="Kabupaten/Kota"
				placeholder="Pilih Kabupaten"
				isLoading={loadingKabupaten}
				isMulti={false}
				labelClassName="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				options={
					kabupatenData
						?.filter((list) => list?.provinsi_id === provinsi)
						?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
				}
				fx={() => {
					form.setValue("kecamatan_id", undefined);
					form.setValue("desa_id", undefined);
				}}
			/>
			<SelectCommon
				key={`kecamatan_id-${provinsi}-${kabupaten}`}
				form={form}
				selectClassName="flex-1"
				name="kecamatan_id"
				disabled={disabled || loadingkecamatan || !kabupaten}
				label="Kecamatan"
				placeholder="Pilih Kecamatan"
				isLoading={loadingkecamatan}
				isMulti={false}
				labelClassName="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				options={
					kecamatanData
						?.filter((list) => list?.kabupaten_id === kabupaten)
						?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
				}
				fx={() => {
					form.setValue("desa_id", undefined);
				}}
			/>
			<SelectCommon
				key={`desa_id-${provinsi}-${kabupaten}-${kecamatan}`}
				form={form}
				name="desa_id"
				disabled={disabled || loadingkelurahan || !kecamatan}
				selectClassName="flex-1"
				label="Keluarahan/Desa"
				placeholder="Pilih Kelurahan"
				isLoading={loadingkelurahan}
				isMulti={false}
				labelClassName="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				options={
					kelurahanData
						?.filter((list) => list?.kecamatan_id === kecamatan)
						?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
				}
			/>
			<InputCommon
				form={form}
				name="kode_wilayah"
				disabled={disabled}
				label="Kode Wilayah*"
				placeholder="Kode Wilayah"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
			/>

			<TextareaCommon
				form={form}
				name="alamat_sekolah"
				label="Alamat"
				placeholder="Masukkan alamat sekolah"
				labelClassname="w-full md:w-1/5"
				className="flex flex-col gap-2 md:flex-row"
				rows={6}
			/>
		</>
	);
}
