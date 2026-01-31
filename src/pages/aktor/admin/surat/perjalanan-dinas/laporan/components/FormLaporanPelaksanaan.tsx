import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { InputCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { angkaKeUrutan } from "@/utils/helpers";
import type { LaporanSPPDFormValues } from "../model";

export function FormLaporanPelaksanaan({
	form,
	isLoading,
}: {
	form: UseFormReturn<LaporanSPPDFormValues>;
	isLoading: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "laporan_pelaksanaan" as never,
	});

	const kegiatan = form.watch("laporan_pelaksanaan");

	return (
		<div className="flex flex-col gap-2 md:gap-4 md:flex-row">
			<p
				className="w-full md:w-1/4 text-sm"
				style={{
					fontWeight: "lighter",
					letterSpacing: "1px",
				}}
			>
				Dasar Surat Tugas
			</p>
			<div className="flex gap-4 flex-col flex-1">
				{kegiatan?.length > 0 && (
					<div className="flex w-full flex-col gap-2">
						{fields.map((field, index) => {
							return (
								<div
									className="flex w-full md:flex-row md:items-center md:gap-2 flex-col items-start"
									key={field.id}
								>
									<div className="w-full">
										<InputCommon
											name={`laporan_pelaksanaan.${index}`}
											form={form}
											placeholder="Masukkan dasar surat tugas"
											type="text"
											disabled={isLoading}
										/>
									</div>
									<button
										type="button"
										disabled={isLoading}
										className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-500 text-white"
										onClick={() => {
											remove(index);
										}}
									>
										<Trash2 size={16} />
									</button>
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
						Tambah Dasar {angkaKeUrutan(kegiatan?.length + 1)}
					</Button>
				</div>
			</div>
		</div>
	);
}
