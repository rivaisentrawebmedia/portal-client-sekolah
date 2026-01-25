import { ButtonEdit, ToggleLibur } from "./components";
import { useGetJamMasuk } from "./controller";
import type { JamMasuk } from "./model";

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

type RowConfig = {
	label: string;
	getValue: (d: JamMasuk | null) => string | number | null;
};

const ROW_MASUK: RowConfig[] = [
	{ label: "Jam Masuk", getValue: (d) => d?.jam_masuk?.slice(0, 5) || "-" },
	{
		label: "Jam Mulai Absensi Masuk",
		getValue: (d) => d?.jam_mulai_absen_masuk?.slice(0, 5) || "-",
	},
	{
		label: "Toleransi Terlambat (menit)",
		getValue: (d) => d?.toleransi_keterlambatan || "-",
	},
	{
		label: "Batas Akhir Jam Masuk",
		getValue: (d) => d?.jam_akhir_absen_masuk?.slice(0, 5) || "-",
	},
];

const ROW_PULANG: RowConfig[] = [
	{ label: "Jam Pulang", getValue: (d) => d?.jam_pulang?.slice(0, 5) || "-" },
	{
		label: "Jam Mulai Absensi Pulang",
		getValue: (d) => d?.jam_mulai_absen_pulang?.slice(0, 5) || "-",
	},
	{
		label: "Toleransi Pulang Cepat (menit)",
		getValue: (d) => d?.toleransi_pulang_cepat || "-",
	},
	{
		label: "Batas Akhir Jam Pulang",
		getValue: (d) => d?.jam_akhir_absen_pulang?.slice(0, 5) || "-",
	},
];

export function JamMasukSection() {
	const { data, loading } = useGetJamMasuk();

	const mapData = HARI.map(
		(hari) =>
			data?.find((d) => d.hari.toLowerCase() === hari.toLowerCase()) || null,
	);

	const renderCell = (value: string | number | null, isLibur?: boolean) => {
		if (isLibur) {
			return (
				<div className="rounded-md bg-red-50 py-4 text-center text-sm font-semibold text-red-600">
					Libur
				</div>
			);
		}

		return (
			<div className="py-4 text-center text-sm text-[#1E5916]">
				{value ?? "-"}
			</div>
		);
	};

	if (loading || !data) {
		return (
			<div className="rounded-2xl bg-white p-6">
				<div className="flex animate-pulse flex-col gap-4">
					<div className="h-6 w-1/3 rounded bg-slate-200" />
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-12 w-full rounded bg-slate-200" />
					))}
				</div>
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-4 p-4 bg-white rounded-md border border-primary">
			<p className="text-lg text-[#1E5916] font-medium">
				Pengaturan Jam Masuk & Jam Pulang
			</p>

			<div className="overflow-auto rounded-lg border border-[#F6FfF5]">
				<table className="w-full border-collapse text-sm text-[#1E5916]">
					<thead>
						<tr className="bg-[#1E5916] text-white">
							<th className="px-4 py-3 text-left font-semibold">Pengaturan</th>
							{HARI.map((hari) => (
								<th key={hari} className="px-4 py-3 text-center font-semibold">
									{hari}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{/* ===== WAKTU MASUK ===== */}
						<tr className="bg-[#F5F9FF]">
							<td colSpan={8} className="px-4 py-3 font-semibold">
								Pengaturan Waktu Masuk
							</td>
						</tr>

						{ROW_MASUK.map((row) => (
							<tr key={row.label} className="border-b border-[#e8eef8]">
								<td className="px-4 py-3">{row.label}</td>
								{mapData.map((d, i) => (
									<td key={i}>{renderCell(row.getValue(d), d?.is_libur)}</td>
								))}
							</tr>
						))}

						{/* ===== WAKTU PULANG ===== */}
						<tr className="bg-[#F5F9FF]">
							<td colSpan={8} className="px-4 py-3 font-semibold">
								Pengaturan Waktu Pulang
							</td>
						</tr>

						{ROW_PULANG.map((row) => (
							<tr key={row.label} className="border-b border-[#e8eef8]">
								<td className="px-4 py-3">{row.label}</td>
								{mapData.map((d, i) => (
									<td key={i}>{renderCell(row.getValue(d), d?.is_libur)}</td>
								))}
							</tr>
						))}

						{/* ===== ACTION ===== */}
						<tr className="bg-[#F5F9FF] border-t border-[#e8eef8]">
							<td className="px-4 py-3">Status Libur</td>
							{mapData.map((d, i) => (
								<td key={i} className="py-2 text-center">
									<ToggleLibur detail={d} />
								</td>
							))}
						</tr>

						<tr className="bg-[#F5F9FF]">
							<td className="px-4 py-3">Edit Data</td>
							{mapData.map((d, i) => (
								<td key={i} className="py-2 text-center">
									<ButtonEdit rowData={d} />
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
