import type { UseFormReturn } from "react-hook-form";
import type { PermohonanCutiFormValues } from "../../layout/model";
import {
	InputCommon,
	SelectCommon,
	TextareaCommon,
} from "@/components/common/basic-input";
import { convertSlugToText } from "@/utils/helpers";
import { useGetJenisCuti } from "../../layout/controller";
import { FormUploadPhoto } from "./FormUploadPhoto";

export function FormData({
	disabled,
	form,
}: {
	form: UseFormReturn<PermohonanCutiFormValues>;
	disabled: boolean;
}) {
	const { data: dataJenis, loading: loadingJenis } = useGetJenisCuti({
		page: 1,
	});
	return (
		<>
			<InputCommon
				form={form}
				name="no_urut"
				disabled
				label="No. Urut Cuti (Generate Otomatis)*"
				placeholder="No. Urut Cuti (Generate Otomatis)"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
			/>

			<div className="flex flex-col gap-2">
				<p
					style={{
						fontWeight: "lighter",
						letterSpacing: "1px",
					}}
				>
					Tanggal Berlaku*
				</p>
				<div className="flex flex-col items-start md:flex-row md:items-center w-full gap-2">
					<InputCommon
						form={form}
						name="mulai"
						disabled={disabled}
						className="md:flex-1 w-full"
						type="date"
					/>
					<p>s.d</p>
					<InputCommon
						form={form}
						name="selesai"
						disabled={disabled}
						className="md:flex-1 w-full"
						type="date"
					/>
				</div>
			</div>
			<TextareaCommon
				form={form}
				name="alasan_cuti"
				disabled={disabled}
				label="Alasan Cuti*"
				placeholder="Alasan Cuti"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
			/>
			<TextareaCommon
				form={form}
				name="alamat_selama_cuti"
				disabled={disabled}
				label="Alamat Selama Cuti*"
				placeholder="Alamat"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
			/>

			<SelectCommon
				form={form}
				name="jenis_cuti_id"
				label="Jenis Cuti"
				placeholder="Jenis Cuti"
				disabled={disabled || loadingJenis}
				isLoading={loadingJenis}
				options={
					dataJenis?.map((item) => {
						return {
							label: item?.nama,
							value: item?.id,
						};
					}) || []
				}
				className="flex flex-col gap-2"
				labelClassName=" w-full"
			/>
			<SelectCommon
				form={form}
				name="status"
				label="Status Permohonan"
				placeholder="Status Permohonan"
				disabled={disabled}
				options={[
					"draft",
					"diajukan",
					"disetujui",
					"ditolak",
					"dibatalkan",
				]?.map((item) => {
					return {
						label: convertSlugToText(item),
						value: item,
					};
				})}
				className="flex flex-col gap-2"
				labelClassName=" w-full"
			/>

			<InputCommon
				form={form}
				name="no_telp"
				disabled={disabled}
				label="No. Telepon yang Bisa Dihubungi Selama Cuti*"
				placeholder="No. Telepon yang Bisa Dihubungi Selama Cuti"
				className="flex flex-col gap-2"
				labelClassname=" w-full"
			/>

			<FormUploadPhoto disabled={disabled} form={form} name="file_cuti" />
		</>
	);
}
