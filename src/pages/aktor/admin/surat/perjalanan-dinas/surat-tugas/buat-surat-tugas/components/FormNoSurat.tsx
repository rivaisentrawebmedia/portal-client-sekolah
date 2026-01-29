import dayjs from "dayjs";
import type { UseFormReturn } from "react-hook-form";
import {
	useFormatSurat,
	useGetBagianSurat,
} from "../../../../pengaturan/bagian-surat/controller";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";
import { toRoman } from "@/utils/helpers";
import { FormFormatSurat } from "./FormFormatSurat";

export function FormNoSurat({
	form,
	isDisabled,
}: {
	form: UseFormReturn<any>;
	isDisabled: boolean;
}) {
	const { data, loading } = useGetBagianSurat({
		page: 1,
	});

	const selectedBagianSurat = data?.find(
		(item) => item?.id === form.watch("bagian_surat_id"),
	);

	const segments = useFormatSurat(form);

	return (
		<div className="flex flex-col gap-4 rounded-md border border-[#cfcfff] bg-gradient-to-br from-[#ededff] to-[#f7f7ff] p-4">
			<div className="flex flex-col gap-0">
				<p className="text-lg text-[#161646]">Penomoran Surat</p>
				<p className="font-light">
					Atur format dan tanggal surat secara otomatis
				</p>
			</div>

			<div className="flex md:gap-4 md:flex-row gap-2 flex-col">
				{/* Bagian Surat */}
				<SelectCommon
					form={form}
					name="bagian_surat_id"
					options={data?.map((item) => {
						return {
							label: item?.nama,
							value: item?.id,
						};
					})}
					disabled={isDisabled}
					isLoading={loading}
					className="w-full md:w-1/5"
					fx={(e) => {
						const selectedBagianSurat = data?.find((item) => item.id === e);

						form.setValue("kode_depan", selectedBagianSurat?.kode_depan);
						form.setValue("kode_belakang", selectedBagianSurat?.kode_belakang);
						form.setValue("perlu_bulan", selectedBagianSurat?.perlu_bulan);
						form.setValue("perlu_tahun", selectedBagianSurat?.perlu_tahun);
						form.setValue(
							"is_bulan_romawi",
							selectedBagianSurat?.is_bulan_romawi,
						);
					}}
					label="Pilih Bagian Surat"
					placeholder="Pilih Bagiaan Surat"
				/>

				<InputCommon
					form={form}
					name="tanggal_surat"
					disabled={isDisabled}
					className="w-full md:w-1/5"
					label="Tanggal Surat"
					type="date"
					fx={(e) => {
						const bulan = dayjs(e).locale("id").format("MM");
						form.setValue("bulan", toRoman(Number(bulan)));
						form.setValue("tahun", dayjs(e).locale("id").format("YYYY"));
					}}
				/>
			</div>

			<FormFormatSurat
				data={selectedBagianSurat}
				form={form}
				isLoading={isDisabled}
			/>

			<div className="flex w-fit flex-col gap-2">
				<p
					style={{
						fontWeight: "lighter",
						letterSpacing: "1px",
					}}
				>
					Format Nomor Surat:
				</p>
				<div className="flex flex-wrap items-center gap-3">
					{segments.map((s, idx) => (
						<span key={s.key} className="flex items-center gap-2">
							<span
								className={
									s.key === "nomor" ? "font-bold text-red-600" : "font-medium"
								}
							>
								{s.value}
							</span>

							{idx < segments.length - 1 && (
								<span className="text-zinc-400">/</span>
							)}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
