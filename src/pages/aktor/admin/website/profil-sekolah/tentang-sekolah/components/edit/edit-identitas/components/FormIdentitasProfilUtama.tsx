import type { UseFormReturn } from "react-hook-form";
import type { TentangSekolahFormValues } from "../../../../model";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";
import { useGetReferensi } from "@/const/listReferensi";

export function FormIdentitasProfilUtama({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<TentangSekolahFormValues>;
}) {
	const { data: akreditasiOpt, loading: loadingAkreditasi } = useGetReferensi({
		url: "akreditasi",
	});
	return (
		<>
			<div className="flex items-center gap-2">
				<p className="text-nowrap text-[#276CCD] font-medium">
					Idenditas & Profil Utama
				</p>
				<div className="border-t flex-1" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<InputCommon
					name="nama"
					label="Nama"
					placeholder="Nama"
					form={form}
					disabled={disabled}
				/>
				<InputCommon
					name="kode"
					label="Kode"
					placeholder="Kode"
					form={form}
					disabled={disabled}
				/>
				<SelectCommon
					name="akreditasi_id"
					label="Akreditasi"
					placeholder="Pilih Akreditasi"
					form={form}
					disabled={disabled}
					isLoading={loadingAkreditasi}
					options={
						akreditasiOpt?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
				/>

				<div className="flex flex-col gap-2">
					<p
						style={{
							fontWeight: "lighter",
							letterSpacing: "1px",
						}}
					>
						Tanggal Berlaku Akreditasi
					</p>
					<div className="flex gap-2 items-center">
						<InputCommon
							name="akreditasi_mulai"
							form={form}
							disabled={disabled}
							className="flex-1"
							type="date"
						/>
						<p className="text-[#276CCD]">s.d</p>
						<InputCommon
							name="akreditasi_sampai"
							form={form}
							disabled={disabled}
							className="flex-1"
							type="date"
						/>
					</div>
				</div>
				<InputCommon
					name="nama_pimpinan"
					label="Nama Pimpinan"
					placeholder="Nama Pimpinan"
					form={form}
					disabled={disabled}
				/>
				<InputCommon
					name="nip_pimpinan"
					label="NIP Pimpinan"
					placeholder="NIP Pimpinan"
					form={form}
					disabled={disabled}
				/>
			</div>
		</>
	);
}
