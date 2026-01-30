import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetLumpsumSPPDByID } from "./controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { TableLumpsum } from "./components";

export default function DetailListLumpsumPage() {
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const { data, loading } = useGetLumpsumSPPDByID();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
				<ArrowBack
					link={`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail/lumpsum?${params?.toString()}`}
					title="Informasi Lumpsum"
					background="#F5F9FF"
					border="#F5F9FF"
					text="#161646"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#eff6ff] border border-[#161646] rounded-md p-3">
				<BasicLabel
					label="Nama Pegawai"
					value={data?.pegawai_nama || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="NIP Pegawai"
					value={data?.pegawai_nip || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="Nama Pejabat"
					value={data?.pejabat_nama || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="NIP Pejabat"
					value={data?.pejabat_nip || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="Nama Bendahara"
					value={data?.bendahara_nama || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="NIP Bendahara"
					value={data?.bendahara_nip || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="Jabatan Pejabat"
					value={data?.jabatan_pejabat || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="Jabatan Bendahara"
					value={data?.jabatan_bendahara || "-"}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
				<BasicLabel
					label="Tanggal"
					value={
						<p>
							{data?.tanggal_keberangkatan
								? dayjs(data?.tanggal_keberangkatan)
										.locale("id")
										.format("DD MMMM YYYY")
								: ""}{" "}
							s.d{" "}
							{data?.tanggal_kepulangan
								? dayjs(data?.tanggal_kepulangan)
										.locale("id")
										.format("DD MMMM YYYY")
								: ""}
						</p>
					}
					className="flex flex-row gap-2"
					labelClassName="w-1/3"
				/>
			</div>

			<div className="flex flex-col gap-4 bg-[#eff6ff] border border-[#161646] rounded-md p-3">
				<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
					<p className="font-medium">Daftar Biaya</p>

					<div className="flex gap-2">
						<Button
							type="button"
							onClick={() => {
								navigate("ubah");
							}}
							variant={"outline"}
							className="border-[#161646] text-[#161646]"
						>
							<FaEdit />
							Edit Biaya
						</Button>
						<Button
							type="button"
							onClick={() => {
								navigate("ubah");
							}}
							className="bg-[#161646] hover:bg-[#161646]/80 text-white"
						>
							<FaPlusCircle />
							Tambah Biaya
						</Button>
					</div>
				</div>

				<TableLumpsum
					data={data?.items || []}
					limit={1000}
					page={1}
					search=""
					loading={loading}
				/>
			</div>
		</div>
	);
}
