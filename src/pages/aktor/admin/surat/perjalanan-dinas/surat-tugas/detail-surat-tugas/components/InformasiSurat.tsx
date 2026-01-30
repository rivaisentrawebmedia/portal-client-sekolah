import { BasicLabel } from "@/components/common/BasicLabel";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import dayjs from "dayjs";

export function InformasiSurat({ data }: { data: SuratTugasByID | undefined }) {
	return (
		<div className="flex p-4 rounded-md bg-blue-50 border border-[#8a8aa2] flex-col gap-2">
			<BasicLabel
				label="Tanggal Surat"
				value={
					<div className="flex gap-1">
						<span className="hidden md:block">:</span>{" "}
						{data?.tanggal_surat
							? dayjs(data?.tanggal_surat).locale("id").format("DD MMMM YYYY")
							: "-"}
					</div>
				}
				className="w-full flex-col md:flex-row"
			/>
			<BasicLabel
				label="No. Surat"
				value={
					<div className="flex gap-1">
						<span className="hidden md:block">:</span>{" "}
						{data?.format_nomor_surat || "-"}
					</div>
				}
				className="w-full flex-col md:flex-row"
			/>
			<BasicLabel
				label="Kegiatan"
				value={
					(data?.kegiatan || [])?.length > 0 ? (
						<ul className="list-disc ml-6">
							{data?.kegiatan?.map((item, idx) => {
								return <li key={idx}>{item}</li>;
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
