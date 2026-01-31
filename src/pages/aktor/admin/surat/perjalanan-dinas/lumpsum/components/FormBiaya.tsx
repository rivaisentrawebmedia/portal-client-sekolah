import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {
	CheckboxCommon,
	InputCommon,
	InputRupiah,
	SelectCommon,
} from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { angkaKeUrutan } from "@/utils/helpers";
import type { LumpsumSPPDFormValues } from "../model";
import { useGetJenisBiaya } from "../../jenis-biaya/controller";
import { useGetReferensi } from "@/const/listReferensi";

export function FormBiaya({
	form,
	isLoading,
}: {
	form: UseFormReturn<LumpsumSPPDFormValues>;
	isLoading: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "items" as never,
	});

	const kegiatan = form.watch("items");

	const { data: biayaOptions, loading: loadingBiaya } = useGetJenisBiaya({
		page: 1,
	});

	const { data: transportasiOptions, loading: loadingTransportasi } =
		useGetReferensi({
			url: "jenis-transportasi",
		});
	return (
		<div className="flex flex-col gap-2 md:gap-4 md:flex-row">
			<p
				className="w-full md:w-1/4 text-sm"
				style={{
					fontWeight: "lighter",
					letterSpacing: "1px",
				}}
			>
				Daftar Biaya
			</p>
			<div className="flex gap-4 flex-col flex-1">
				{kegiatan?.length > 0 && (
					<div className="flex w-full flex-col gap-2">
						{fields.map((field, index) => {
							const jenis_biaya_id = biayaOptions?.find(
								(item) =>
									item?.id === form.watch(`items.${index}.jenis_biaya_id`),
							)?.nama;
							return (
								<div
									className="flex flex-col gap-2 p-3 bg-white border rounded-md"
									key={field.id}
								>
									<div className="flex flex-col gap-2 md:flex-row">
										<SelectCommon
											name={`items.${index}.jenis_biaya_id`}
											form={form}
											placeholder="Pilih jenis biaya"
											disabled={isLoading}
											options={biayaOptions?.map((item) => {
												return {
													label: item?.nama,
													value: item?.id,
												};
											})}
											isLoading={loadingBiaya}
											className="flex-1"
										/>
										{jenis_biaya_id === "Transportasi" && (
											<>
												<SelectCommon
													name={`items.${index}.jenis_transportasi_id`}
													form={form}
													placeholder="Pilih transportasi"
													disabled={isLoading}
													isLoading={loadingTransportasi}
													options={
														transportasiOptions?.map((item) => {
															return {
																label: item?.nama,
																value: item?.id,
															};
														}) || []
													}
													className="flex-1"
												/>
												<InputCommon
													name={`items.${index}.no_tiket`}
													form={form}
													placeholder="No. Tiket"
													type="text"
													className="flex-1"
													disabled={isLoading}
												/>
											</>
										)}

										<InputRupiah
											name={`items.${index}.harga`}
											form={form}
											placeholder="Harga"
											className="flex-1"
											disabled={isLoading}
										/>
										<InputCommon
											name={`items.${index}.qty`}
											form={form}
											placeholder="Qty"
											type="number"
											className="flex-1"
											disabled={isLoading}
										/>
										<CheckboxCommon
											name={`items.${index}.ril`}
											form={form}
											disabled={isLoading}
											label="Riil"
										/>
									</div>
									<div className="flex flex-col gap-2 md:flex-row md:items-center">
										<InputCommon
											name={`items.${index}.redaksi`}
											form={form}
											placeholder="Redaksi"
											className="flex-1"
											type="text"
											disabled={isLoading}
										/>
										<button
											type="button"
											disabled={isLoading}
											className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500 text-white"
											onClick={() => {
												remove(index);
											}}
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}

				<div className="flex">
					<Button
						type="button"
						className="w-fit bg-[#161646] hover:bg-[#161646]"
						onClick={() => {
							append("");
						}}
					>
						<Plus size={14} />
						Tambah Biaya {angkaKeUrutan(kegiatan?.length + 1)}
					</Button>
				</div>
			</div>
		</div>
	);
}
