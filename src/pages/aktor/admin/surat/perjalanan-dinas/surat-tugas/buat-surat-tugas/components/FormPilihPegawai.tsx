import { Loader2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { getInitials } from "@/utils/helpers";
import type { SuratTugasFormValues } from "../../list-surat-tugas/model";
import { useGetSuratTugasPegawai } from "../../list-surat-tugas/controller";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { InputCommon } from "@/components/common/basic-input";

export function FormPilihPegawai({
	form,
	disabled,
}: {
	form: UseFormReturn<SuratTugasFormValues>;
	disabled: boolean;
}) {
	const jabatan_id = form.watch("jabatan_penandatangan_id");
	const tanggal_mulai = form.watch("tanggal_mulai");
	const tanggal_selesai = form.watch("tanggal_selesai");

	const { data, loading: loadingUser } = useGetSuratTugasPegawai({
		page: 1,
		jabatan_id: jabatan_id,
		tanggal_mulai: tanggal_mulai,
		tanggal_selesai: tanggal_selesai,
	});

	const loading = disabled || loadingUser;
	const listPegawai = form.watch("list_pegawai") ?? [];

	const filteredPejabat = data?.filter((item) =>
		listPegawai?.some((p) => p?.pegawai_id === item?.id),
	);

	const togglePegawai = (id: string | number) => {
		const idStr = String(id);

		const exists = listPegawai?.some((p) => p?.pegawai_id === idStr);

		form.setValue(
			"list_pegawai",
			exists
				? listPegawai?.filter((p) => p?.pegawai_id !== idStr)
				: [
						...(listPegawai ?? []),
						{
							pegawai_id: idStr,
						},
					],
		);
	};

	console.log(form.watch());

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				{jabatan_id && tanggal_mulai && tanggal_selesai ? (
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* LIST PEGAWAI */}
						<div className="space-y-3">
							<h3 className="text-base font-semibold text-slate-800">
								Pilih Pegawai
							</h3>

							<div className="overflow-hidden rounded-lg border border-slate-200">
								{/* HEADER */}
								<div className="grid grid-cols-12 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
									<div className="col-span-1 text-center">No</div>
									<div className="col-span-8">Pegawai</div>
									<div className="col-span-3 text-center">Pilih</div>
								</div>

								{/* BODY */}
								{loading ? (
									<div className="flex justify-center py-8">
										<Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" />
									</div>
								) : data?.length ? (
									data.map((item, idx) => {
										const isChecked = listPegawai?.some(
											(p) => p?.pegawai_id === String(item?.id),
										);

										return (
											<div
												key={item.id}
												onClick={() => togglePegawai(item.id)}
												className={`grid cursor-pointer grid-cols-12 items-center px-4 py-3 text-sm transition
												${
													isChecked
														? "bg-[#edf6ec] border-l-4 border-[var(--primary)]"
														: "hover:bg-[#f3faf2]"
												}`}
											>
												<div className="col-span-1 text-center text-slate-500">
													{idx + 1}
												</div>

												<div className="col-span-8 flex items-center gap-3">
													<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6ec] text-xs font-medium text-[var(--primary)]">
														{getInitials(item?.nama)?.slice(0, 2)}
													</div>

													<div className="min-w-0">
														<p className="truncate font-medium text-slate-800">
															{item?.nama}
														</p>
														<p className="truncate text-xs text-slate-500">
															{item?.jabatan}
														</p>
													</div>
												</div>

												<div className="col-span-3 flex justify-center">
													<input
														type="checkbox"
														checked={isChecked}
														onChange={() => togglePegawai(item.id)}
														onClick={(e) => e.stopPropagation()}
														className="h-4 w-4 cursor-pointer accent-[var(--primary)]"
													/>
												</div>
											</div>
										);
									})
								) : (
									<div className="py-6 text-center text-sm text-slate-500">
										Tidak ada data pegawai
									</div>
								)}
							</div>
						</div>

						{/* LIST TERPILIH */}
						<div className="space-y-3">
							<h3 className="text-base font-semibold text-slate-800">
								Pegawai Dipilih
							</h3>

							<div className="rounded-lg border border-slate-200 p-4">
								{filteredPejabat?.length ? (
									<ul className="space-y-2 text-sm ">
										{filteredPejabat?.map((item, idx) => (
											<li
												key={item?.id}
												className="flex flex-col w-full gap-2 md:flex-row md:items-center"
											>
												<div className="flex items-center w-full md:w-1/2 gap-2 text-slate-700">
													<span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
													{item?.nama}
												</div>
												<InputCommon
													form={form}
													name={`list_pegawai.${idx}.jabatan_kegiatan`}
													disabled={disabled}
													className="w-full md:w-1/2"
													placeholder="Masukkan Jabatan"
												/>
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-slate-500">
										Belum ada pegawai dipilih
									</p>
								)}
							</div>
						</div>
					</div>
				) : (
					<Empty className="border-0 rounded-none ">
						<EmptyHeader>
							<EmptyTitle>
								Jabatan dan tanggal kegiatan belum dipilih
							</EmptyTitle>
							<EmptyDescription>
								Silakan pilih jabatan dan tanggal terlebih dahulu untuk
								melanjutkan.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			</div>
		</div>
	);
}
