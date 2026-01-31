import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { LumpsumSPPD } from "../model";
import { formatRupiah } from "@/utils/helpers";
import { Pencil, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SuratTugasByID } from "../../surat-tugas/list-surat-tugas/model";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";
import type { ProfilOrganisasi } from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil/model";
import {
	ButtonCetakSuratKwitansi,
	ButtonCetakSuratLumpsum,
	ButtonCetakSuratRiil,
} from "./print";

interface TableLumpsumSPPDProps {
	data: LumpsumSPPD[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	detailSuratTugas: SuratTugasByID;
	kopSurat: KopSurat;
	profil: ProfilOrganisasi;
}

export function TableLumpsumSPPD({
	data,
	page,
	limit,
	search,
	loading,
	detailSuratTugas,
	kopSurat,
	profil,
}: TableLumpsumSPPDProps) {
	const navigate = useNavigate();
	const isEmpty = !loading && data.length === 0;
	const isSearching = Boolean(search?.trim());

	return (
		<Table className="md:table-fixed w-full border border-[#C8C8C8] overflow-auto">
			<TableHeader className="bg-[#e0efff]">
				{/* BARIS 1 */}
				<TableRow>
					<TableHead
						rowSpan={2}
						className="w-[50px] text-center align-middle font-light text-[#162259]"
					>
						No
					</TableHead>

					<TableHead
						rowSpan={2}
						className="align-middle font-light text-[#162259]"
					>
						Pegawai
					</TableHead>

					<TableHead
						colSpan={2}
						className="text-center font-light text-[#162259]"
					>
						Lumpsum
					</TableHead>

					<TableHead
						colSpan={2}
						className="text-center font-light text-[#162259]"
					>
						Riil
					</TableHead>

					<TableHead
						colSpan={2}
						className="text-center font-light text-[#162259]"
					>
						Kwitansi
					</TableHead>
				</TableRow>

				{/* BARIS 2 */}
				<TableRow>
					<TableHead className="font-light text-[#162259]">Jumlah</TableHead>
					<TableHead className="text-center font-light text-[#162259]">
						Cetak
					</TableHead>

					<TableHead className="font-light text-[#162259]">Lumpsum</TableHead>
					<TableHead className="font-light text-center text-[#162259]">
						Cetak
					</TableHead>

					<TableHead className="font-light text-center text-[#162259]">
						Kwitansi
					</TableHead>
					<TableHead className="text-center font-light text-[#162259]">
						Amplop
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{/* 🔄 LOADING SKELETON */}
				{loading &&
					Array.from({ length: 3 }).map((_, idx) => (
						<TableRow key={`skeleton-${idx}`}>
							<TableCell className="text-center">
								<Skeleton className="mx-auto h-4 w-6" />
							</TableCell>

							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>

							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4" />
							</TableCell>

							<TableCell>
								<div className="flex justify-center">
									<Skeleton className="h-8 w-8 rounded-full" />
								</div>
							</TableCell>
						</TableRow>
					))}

				{/* 📭 EMPTY STATE */}
				{isEmpty && (
					<TableRow>
						<TableCell
							colSpan={8}
							className="py-5 text-center text-sm text-gray-500"
						>
							{isSearching ? (
								<>
									Pencarian <strong>"{search}"</strong> tidak ditemukan
								</>
							) : (
								"Belum ada data Jenis Transportasi"
							)}
						</TableCell>
					</TableRow>
				)}

				{/* 📄 DATA */}
				{!loading &&
					data.map((item, idx) => (
						<TableRow key={idx}>
							<TableCell className="text-center align-top">
								{(page - 1) * limit + idx + 1}
							</TableCell>

							<TableCell className="align-top">
								<div className="flex flex-col">
									<p className="text-wrap">{item?.nama_pegawai}</p>
									<p className="text-[#888]">{item?.nip}</p>
								</div>
							</TableCell>

							<TableCell className="align-middle">
								{Number(item?.total_lumpsum) > 0 ? (
									<div className="flex items-center gap-2">
										<p>Rp. {formatRupiah(Number(item?.total_lumpsum) || 0)}</p>
										<button
											type="button"
											onClick={() => {
												navigate(`${item?.pegawai_id}/detail-lumpsum`);
											}}
											className="bg-[#CDA327] p-2 rounded-md text-white"
										>
											<Pencil size={12} />
										</button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<p className="text-[#CD3C3C]">Belum Dibuat</p>
										<button
											type="button"
											onClick={() => {
												navigate(`${item?.pegawai_id}/detail-lumpsum`);
											}}
											className="bg-[#CDA327] p-2 rounded-md text-white"
										>
											<Pencil size={12} />
										</button>
									</div>
								)}
							</TableCell>

							<TableCell className="align-middle">
								<div className="flex justify-center gap-2 flex-wrap">
									<ButtonCetakSuratLumpsum
										data={item}
										detailSuratTugas={detailSuratTugas}
										kopSurat={kopSurat}
										profil={profil}
									/>
								</div>
							</TableCell>
							<TableCell className="align-middle">
								<p>Rp. {formatRupiah(Number(item?.total_ril) || 0)}</p>
							</TableCell>

							<TableCell className="align-middle">
								<div className="flex justify-center gap-2 flex-wrap">
									<ButtonCetakSuratRiil
										data={item}
										detailSuratTugas={detailSuratTugas}
										kopSurat={kopSurat}
									/>
								</div>
							</TableCell>
							<TableCell className="align-middle">
								<div className="flex justify-center gap-2 flex-wrap">
									<ButtonCetakSuratKwitansi
										data={item}
										detailSuratTugas={detailSuratTugas}
										kopSurat={kopSurat}
										profil={profil}
									/>
								</div>
							</TableCell>
							<TableCell className="align-middle">
								<div className="flex justify-center gap-2 flex-wrap">
									<button
										type="button"
										disabled
										onClick={() => {}}
										className="bg-[#161646] flex items-center gap-2 px-3 py-1.5 rounded-md text-white"
									>
										Amplop
										<Printer size={12} />
									</button>
								</div>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
