import { Loader2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { ShiftKerjaFormValues } from "../../list-shift-kerja/model";
import { useGetManajemenUser } from "@/pages/aktor/admin/portal-admin/manajemen-user/list-user/controller";
import { getInitials } from "@/utils/helpers";

export function FormPengaturan({
	form,
	disabled,
}: {
	form: UseFormReturn<ShiftKerjaFormValues>;
	disabled: boolean;
}) {
	const { data, loading: loadingUser } = useGetManajemenUser({ page: 1 });

	const loading = disabled || loadingUser;
	const listPegawai = form.watch("pegawai_id") ?? [];

	const filteredPejabat = data?.filter((item) =>
		listPegawai.includes(String(item.id)),
	);

	const togglePegawai = (id: string | number) => {
		const idStr = String(id);
		form.setValue(
			"pegawai_id",
			listPegawai.includes(idStr)
				? listPegawai.filter((v) => v !== idStr)
				: [...listPegawai, idStr],
		);
	};

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
									const isChecked = listPegawai.includes(String(item.id));

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
												{item.photo ? (
													<img
														src={item.photo}
														alt={item.nama}
														className="h-9 w-9 rounded-full object-cover"
													/>
												) : (
													<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6ec] text-xs font-medium text-[var(--primary)]">
														{getInitials(item.nama)}
													</div>
												)}

												<div className="min-w-0">
													<p className="truncate font-medium text-slate-800">
														{item.nama}
													</p>
													<p className="truncate text-xs text-slate-500">
														{item.jabatan}
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
								<ul className="space-y-2 text-sm">
									{filteredPejabat.map((item) => (
										<li
											key={item.id}
											className="flex items-center gap-2 text-slate-700"
										>
											<span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
											{item.nama}
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
			</div>
		</div>
	);
}
