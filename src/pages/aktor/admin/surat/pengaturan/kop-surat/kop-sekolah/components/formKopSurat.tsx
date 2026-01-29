import type { UseFormReturn } from "react-hook-form";
import type { KopSuratFormValues } from "../model";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";

export function FormKopSurat({
	form,
	loading,
	title,
	isi,
	gaya,
	jenis,
	ukuran,
}: {
	form: UseFormReturn<KopSuratFormValues>;
	loading: boolean;
	title: string;
	isi: string;
	gaya: string;
	jenis: string;
	ukuran: string;
}) {
	return (
		<div className="flex flex-col gap-2">
			<p className="font-medium">{title}</p>
			<div className="flex md:gap-4 md:flex-row md:items-end flex-col gap-2">
				<InputCommon
					form={form}
					name={isi}
					type="text"
					className="flex w-full md:w-1/4 flex-col"
					disabled={loading}
					placeholder="Masukkan Isi"
				/>

				<SelectCommon
					form={form}
					name={jenis}
					className="flex w-full md:w-1/4 flex-col"
					disabled={loading}
					placeholder="Pilih Jenis Font"
					label="Jenis Font"
					options={["Roboto"]?.map((item) => {
						return {
							label: item,
							value: item,
						};
					})}
				/>

				<SelectCommon
					form={form}
					name={gaya}
					className="flex w-full md:w-1/4 flex-col"
					disabled={loading}
					placeholder="Pilih Gaya Font"
					label="Gaya Font"
					options={["Normal", "Bold", "Italic"]?.map((item) => {
						return {
							label: item,
							value: item,
						};
					})}
				/>

				<InputCommon
					form={form}
					name={ukuran}
					type="text"
					className="flex w-full md:w-1/4 flex-col"
					disabled={loading}
					placeholder="Masukkan Ukuran"
					label="Ukuran Font (pt)"
				/>
			</div>
		</div>
	);
}
