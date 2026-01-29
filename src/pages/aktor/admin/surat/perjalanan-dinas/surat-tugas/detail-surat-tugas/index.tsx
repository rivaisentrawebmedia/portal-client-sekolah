import { ArrowBack } from "@/components/common/ArrowBack";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/utils/usePathname";
import { FaEdit, FaPrint } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSuratTugasByID } from "../list-surat-tugas/controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";

export default function DetailSuratTugasPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();

	const { data } = useGetSuratTugasByID();
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
					<ArrowBack
						link={`/admin/surat/perjalanan-dinas/surat-tugas-spd?${params?.toString()}`}
						title="Detail Surat Tugas"
						background="#F5F9FF"
						border="#F5F9FF"
						text="#161646"
					/>
					<div className="flex flex-col gap-2 md:flex-row">
						<Button
							type="button"
							variant={"outline"}
							onClick={() => {
								navigate(
									`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/edit`,
								);
							}}
							className="border-[#161646] text-[#161646] hover:text-[#161646]"
						>
							<FaEdit />
							Edit Surat Tugas
						</Button>
						<Button
							type="button"
							disabled
							className="bg-[#161646] hover:bg-[#161646]/80"
						>
							<FaPrint />
							Cetak Surat Tugas
						</Button>
					</div>
				</div>

				<div className="flex p-4 rounded-md bg-blue-50 border border-[#8a8aa2] flex-col gap-2">
					<BasicLabel
						label="Tanggal Surat"
						value={
							<div className="flex gap-1">
								<span className="hidden md:block">:</span>{" "}
								{data?.tanggal_surat
									? dayjs(data?.tanggal_surat)
											.locale("id")
											.format("DD MMMM YYYY")
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

				<div className="flex p-4 rounded-md bg-blue-50 border border-[#8a8aa2] flex-col gap-2">
					<BasicLabel
						label="Dibuat Oleh"
						value={
							<div className="flex gap-1">
								<span className="hidden md:block">:</span> {"-"}
							</div>
						}
						className="w-full flex-col md:flex-row"
					/>
					<BasicLabel
						label="Satuan Kerja"
						value={
							<div className="flex gap-1">
								<span className="hidden md:block">:</span>{" "}
								{data?.nomor_surat || "-"}
							</div>
						}
						className="w-full flex-col md:flex-row"
					/>
					<BasicLabel
						label="Penandatangan"
						value={
							<div className="flex gap-1">
								<span className="hidden md:block">:</span> {"-"}
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
										return <li key={idx}>{item?.jabatan_kegiatan}</li>;
									})}
								</ul>
							) : (
								<p>-</p>
							)
						}
					/>
				</div>
			</div>
		</>
	);
}
