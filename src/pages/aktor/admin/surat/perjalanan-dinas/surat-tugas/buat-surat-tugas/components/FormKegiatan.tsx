import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { SuratTugasFormValues } from "../../list-surat-tugas/model";
import { InputCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { angkaKeUrutan } from "@/utils/helpers";

export function FormKegiatan({
	form,
	isLoading,
}: {
	form: UseFormReturn<SuratTugasFormValues>;
	isLoading: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "kegiatan" as never,
	});

	const kegiatan = form.watch("kegiatan");

	return (
		<div className="flex flex-col gap-4 rounded-md border border-[#cfcfff] bg-gradient-to-br from-[#ededff] to-[#f7f7ff] p-4">
			<p className="text-lg text-[#161646]">Kegiatan</p>
			<div className="flex gap-4 flex-col">
				{kegiatan?.length > 0 && (
					<div className="flex w-full flex-col gap-2">
						{fields.map((field, index) => {
							return (
								<div
									className="flex w-full md:flex-row md:items-center md:gap-2 flex-col items-start"
									key={field.id}
								>
									<p className="w-full md:w-1/6">{angkaKeUrutan(index + 1)}</p>
									<div className="w-full md:w-5/6">
										<InputCommon
											name={`kegiatan.${index}`}
											form={form}
											placeholder="Masukkan Kegiatan"
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
					{kegiatan?.length > 0 && <div className="hidden md:block md:w-1/6" />}
					<Button
						type="button"
						className="w-fit bg-[#161646] hover:bg-[#161646]"
						onClick={() => {
							append("");
						}}
					>
						<Plus size={14} />
						Tambah Kegiatan {angkaKeUrutan(kegiatan?.length + 1)}
					</Button>
				</div>
			</div>
		</div>
	);
}
