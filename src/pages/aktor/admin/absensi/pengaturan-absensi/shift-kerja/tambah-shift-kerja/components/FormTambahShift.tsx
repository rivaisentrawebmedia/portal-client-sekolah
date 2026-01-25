/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { ShiftKerjaFormValues } from "../../list-shift-kerja/model";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";
import { convertSlugToText } from "@/utils/helpers";
import { InputCommon } from "@/components/common/basic-input";
import { useEffect } from "react";
import clsx from "clsx";

const ALL_DAYS = [
	"senin",
	"selasa",
	"rabu",
	"kamis",
	"jumat",
	"sabtu",
	"minggu",
];

export function FormTambahShift({
	form,
	loading,
}: {
	form: UseFormReturn<ShiftKerjaFormValues>;
	loading: boolean;
}) {
	const { control, watch } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "jam_kerja" as never,
	});

	const selectedDays = watch("jam_kerja")?.map((item: any) => item.hari) || [];

	useEffect(() => {
		if (!fields || fields.length === 0) {
			append({
				hari: "senin",
				jam_masuk: "",
				jam_mulai_absen_masuk: "",
				jam_akhir_absen_masuk: "",
				toleransi_keterlambatan: "",
				jam_pulang: "",
				jam_mulai_absen_pulang: "",
				jam_akhir_absen_pulang: "",
				toleransi_pulang_cepat: "",
				is_libur: false,
			});
		}
	}, [fields, append]);

	return (
		<div className="space-y-6">
			{/* HEADER */}
			<div className="flex items-center gap-4">
				<h3 className="text-base font-semibold text-[var(--primary)]">
					Daftar Jam Kerja
				</h3>

				<button
					type="button"
					onClick={() =>
						append({
							hari: "",
							jam_masuk: "",
							jam_mulai_absen_masuk: "",
							jam_akhir_absen_masuk: "",
							toleransi_keterlambatan: "",
							jam_pulang: "",
							jam_mulai_absen_pulang: "",
							jam_akhir_absen_pulang: "",
							toleransi_pulang_cepat: "",
							is_libur: false,
						})
					}
					className="ml-auto flex items-center gap-2 rounded-md border border-[var(--primary)] px-3 py-1.5 text-sm text-[var(--primary)] hover:bg-[#edf6ec]"
				>
					<Plus size={14} />
					Tambah
				</button>
			</div>

			{/* LIST SHIFT */}
			<div className="space-y-5">
				{fields.map((field, index) => {
					const currentDay = selectedDays[index];

					const dayOptions = ALL_DAYS.filter(
						(day) => day === currentDay || !selectedDays.includes(day),
					);

					return (
						<div
							key={field.id}
							className={clsx("rounded-xl border p-5 shadow-sm", {
								"border-red-300 bg-red-50": form.watch(
									`jam_kerja.${index}.is_libur`,
								),
								"border-slate-200 bg-white ": !form.watch(
									`jam_kerja.${index}.is_libur`,
								),
							})}
						>
							{/* HEADER CARD */}
							<div className="mb-4 flex items-center justify-between">
								<p className="text-sm font-semibold text-[var(--primary)]">
									Hari Kerja {index + 1}
								</p>

								<button
									type="button"
									disabled={loading}
									onClick={() => remove(index)}
									className="flex items-center gap-1.5 rounded-md border border-red-500 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50"
								>
									<Trash2 size={14} />
									Hapus
								</button>
							</div>

							{/* HARI */}
							<div className="mb-6 space-y-2">
								<p className="text-sm font-medium text-slate-700">Hari</p>

								<RadioCommon
									form={form}
									name={`jam_kerja.${index}.hari`}
									disabled={loading}
									className="w-full md:w-1/2"
									options={dayOptions.map((item) => ({
										label: convertSlugToText(item),
										value: item,
									}))}
								/>
							</div>

							{/* JAM MASUK & PULANG */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{/* MASUK */}
								<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
									<p className="mb-3 text-sm font-semibold text-slate-700">
										Jadwal Masuk
									</p>

									<div className="space-y-3">
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_masuk`}
											disabled={loading}
											label="Jam Masuk"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_mulai_absen_masuk`}
											disabled={loading}
											label="Mulai Absen"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_akhir_absen_masuk`}
											disabled={loading}
											label="Akhir Absen"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.toleransi_keterlambatan`}
											disabled={loading}
											label="Toleransi Terlambat"
											placeholder="Menit"
										/>
									</div>
								</div>

								{/* PULANG */}
								<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
									<p className="mb-3 text-sm font-semibold text-slate-700">
										Jadwal Pulang
									</p>

									<div className="space-y-3">
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_pulang`}
											disabled={loading}
											label="Jam Pulang"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_mulai_absen_pulang`}
											disabled={loading}
											label="Mulai Absen"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.jam_akhir_absen_pulang`}
											disabled={loading}
											label="Akhir Absen"
											type="time"
										/>
										<InputCommon
											form={form}
											name={`jam_kerja.${index}.toleransi_pulang_cepat`}
											disabled={loading}
											label="Toleransi Pulang Cepat"
											placeholder="Menit"
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
