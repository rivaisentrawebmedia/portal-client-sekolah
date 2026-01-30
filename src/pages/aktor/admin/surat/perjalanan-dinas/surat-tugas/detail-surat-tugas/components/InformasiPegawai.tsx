import { BasicLabel } from "@/components/common/BasicLabel";
import type { SuratTugasByID } from "../../list-surat-tugas/model";

export function InformasiPegawai({
	data,
}: {
	data: SuratTugasByID | undefined;
}) {
	return (
		<div className="flex p-4 rounded-md bg-blue-50 border border-[#8a8aa2] flex-col gap-2">
			<BasicLabel
				label="Dibuat Oleh"
				value={
					<div className="flex gap-1">
						<span className="hidden md:block">:</span>{" "}
						{data?.dibuat_oleh || "-"}
					</div>
				}
				className="w-full flex-col md:flex-row"
			/>
			<BasicLabel
				label="Satuan Kerja"
				value={
					<div className="flex gap-1">
						<span className="hidden md:block">:</span>{" "}
						{data?.satuan_kerja || "-"}
					</div>
				}
				className="w-full flex-col md:flex-row"
			/>
			<BasicLabel
				label="Penandatangan"
				value={
					<div className="flex gap-1">
						<span className="hidden md:block">:</span>{" "}
						{data?.penandatangan || "-"}
					</div>
				}
				className="w-full flex-col md:flex-row"
			/>
			<BasicLabel
				label="Daftar Pegawai"
				value={
					(data?.list_pegawai || [])?.length > 0 ? (
						<ul className="list-disc ml-6">
							{data?.list_pegawai?.map((item, idx) => {
								return <li key={idx}>{item?.nama || "?"}</li>;
							})}
						</ul>
					) : (
						<p>-</p>
					)
				}
			/>
		</div>
	);
}
