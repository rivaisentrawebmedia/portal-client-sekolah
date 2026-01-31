import { ArrowBack } from "@/components/common/ArrowBack";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/utils/usePathname";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSuratTugasByID } from "../list-surat-tugas/controller";
import { ButtonCetakSuratDinas } from "./print";
import { InformasiPegawai, InformasiSurat } from "./components";
import { LoadingSpinner } from "@/components/ui/loading";
import { useGetSPP } from "../../sppd/list-sppd/controller";
import { ChevronsRight, Edit, Plus } from "lucide-react";
import { TableSPPD } from "../../sppd/list-sppd/components";

export default function DetailSuratTugasPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();

	const { data, loading } = useGetSuratTugasByID();

	const { data: sppd, loading: loadingSppd } = useGetSPP();
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
						<ButtonCetakSuratDinas />
					</div>
				</div>

				{loading ? (
					<LoadingSpinner />
				) : (
					<>
						<InformasiSurat data={data} />

						<InformasiPegawai data={data} />
					</>
				)}

				<div className="flex p-4 rounded-md border border-[#8a8aa2] flex-col gap-2">
					<div className="flex flex-col md:flex-row md:justify-between gap-4">
						<p>SPPD</p>
						{sppd && (
							<>
								<Button
									type="button"
									variant={"outline"}
									className="w-fit text-[#161646] border-[#161646] hover:text-[#161646]/80"
									onClick={() => {
										navigate(
											`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail/edit`,
										);
									}}
								>
									<Edit size={14} />
									Edit SPPD
								</Button>
							</>
						)}
					</div>
					{!sppd && (
						<Button
							type="button"
							className="w-fit bg-[#161646] hover:bg-[#161646]/80"
							onClick={() => {
								navigate(
									`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail/tambah`,
								);
							}}
						>
							<Plus size={14} />
							Tambah SPPD
						</Button>
					)}

					{sppd && (
						<>
							<TableSPPD
								data={sppd ? [sppd] : []}
								limit={100}
								page={1}
								loading={loadingSppd}
								search=""
							/>
							<div className="flex flex-col gap-2 md:flex-row md:justify-end">
								<Button
									type="button"
									onClick={() => {
										navigate("lumpsum");
									}}
									className="bg-[#0070e4] hover:bg-[#0070e4]/80"
								>
									Lumpsum
									<ChevronsRight />
								</Button>
								<Button
									onClick={() => {
										navigate("laporan");
									}}
									type="button"
									className="bg-[#292d8b] hover:bg-[#292d8b]/80"
								>
									Laporan
									<ChevronsRight />
								</Button>
								<Button
									type="button"
									onClick={() => {
										navigate("dokumentasi");
									}}
									className="bg-[#3a6012] hover:bg-[#3a6012]/80"
								>
									Dokumentasi
									<ChevronsRight />
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
