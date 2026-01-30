import type { UseFormReturn } from "react-hook-form";
import { useGetSuratTugasByID } from "../../surat-tugas/list-surat-tugas/controller";
import type { EdiSPPDFormValues } from "../list-sppd/model";
import { InputCommon } from "@/components/common/basic-input";

export function FormPilihPegawai({
	form,
	disabled,
}: {
	form: UseFormReturn<EdiSPPDFormValues>;
	disabled: boolean;
}) {
	const { data: selected } = useGetSuratTugasByID();
	const data = selected?.list_pegawai;

	return (
		<div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<p className="text-lg font-semibold">Informasi Keberangkatan Pegawai</p>

			{/* ===== TABLE HEADER (DESKTOP ONLY) ===== */}
			<div className="hidden md:grid grid-cols-[40px_1fr_1fr_1fr_1fr] gap-2 border-b pb-2 text-sm font-medium text-slate-600">
				<div>#</div>
				<div>Pegawai</div>
				<div>Tgl. Berangkat</div>
				<div>Tgl. Pulang</div>
				<div>No. SPPD</div>
			</div>

			{/* ===== DATA ===== */}
			<div className="flex flex-col gap-3">
				{data?.map((item, idx) => (
					<div
						key={idx}
						className="
							grid gap-3 rounded-lg border border-slate-200 p-3
							md:grid-cols-[40px_1fr_1fr_1fr_1fr]
							md:items-center md:border-0 md:p-0
						"
					>
						{/* INDEX */}
						<div className="text-sm text-slate-500 md:block">
							<span className="md:hidden font-medium">Pegawai ke-</span>{" "}
							{idx + 1}
						</div>

						{/* NAMA */}
						<div>
							<p className="md:hidden text-xs text-slate-500">Nama Pegawai</p>
							<p className="font-medium">{item?.nama}</p>
						</div>

						{/* TANGGAL BERANGKAT */}
						<div>
							<p className="md:hidden text-xs text-slate-500">
								Tanggal Berangkat
							</p>
							<InputCommon
								form={form}
								name={`list_pegawai.${idx}.tanggal_keberangkatan`}
								disabled={disabled}
								type="date"
								className="w-full"
							/>
						</div>

						{/* TANGGAL PULANG */}
						<div>
							<p className="md:hidden text-xs text-slate-500">Tanggal Pulang</p>
							<InputCommon
								form={form}
								name={`list_pegawai.${idx}.tanggal_kepulangan`}
								disabled={disabled}
								type="date"
								className="w-full"
							/>
						</div>

						{/* NO SPPD */}
						<div>
							<p className="md:hidden text-xs text-slate-500">No. SPPD</p>
							<InputCommon
								form={form}
								name={`list_pegawai.${idx}.no_sppd`}
								disabled={disabled}
								className="w-full"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
