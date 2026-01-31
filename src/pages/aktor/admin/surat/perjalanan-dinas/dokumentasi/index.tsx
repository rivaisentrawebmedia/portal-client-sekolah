import { Button } from "@/components/ui/button";
import { useGetDokumentasiSPPD, usePostDokumentasiSPPD } from "./controller";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import { ButtonCetakDokumentasi, ButtonDelete } from "./components";
import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { useGetSuratTugasByID } from "../surat-tugas/list-surat-tugas/controller";
import { useGetKopSurat } from "../../pengaturan/kop-surat/kop-sekolah/controller";

function DokumentasiSPPDSkeleton() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className="aspect-square w-full animate-pulse rounded-md bg-gray-200"
				/>
			))}
		</>
	);
}

function DokumentasiSPPDEmpty() {
	return (
		<div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-md border border-dashed py-12 text-center">
			<FaCamera className="text-4xl text-gray-400" />
			<p className="text-sm text-gray-500">Belum ada gambar di dokumentasi</p>
			<p className="text-xs text-gray-400">
				Klik <span className="font-medium">Tambah Gambar</span> untuk mengunggah
			</p>
		</div>
	);
}

export default function DokumentasiSPPDPage() {
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const { data: dataDokumentasiSPPD, loading: loadingDokumentasiSPPD } =
		useGetDokumentasiSPPD();
	const fileRef = useRef<HTMLInputElement | null>(null);

	const { submit, loading } = usePostDokumentasiSPPD();

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		submit(file);
		e.target.value = "";
	};

	const handlePickFile = () => {
		fileRef.current?.click();
	};

	const { data: dataSurat } = useGetSuratTugasByID();
	const { data: dataKopSurat } = useGetKopSurat();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
					<ArrowBack
						link={`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail?${params?.toString()}`}
						title="Dokumentasi"
						background="#F5F9FF"
						border="#F5F9FF"
						text="#161646"
					/>
				</div>

				<div className="flex items-center gap-2">
					<Button
						type="button"
						className="bg-[#161646] hover:bg-[#161646]/80"
						onClick={handlePickFile}
						disabled={loading}
					>
						<FaCamera />
						Tambah Gambar
					</Button>
					<input
						ref={fileRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleUpload}
					/>

					{dataKopSurat &&
						dataSurat &&
						dataDokumentasiSPPD &&
						(dataDokumentasiSPPD || [])?.length > 0 && (
							<ButtonCetakDokumentasi
								data={dataDokumentasiSPPD}
								kopSurat={dataKopSurat}
								surat={dataSurat}
							/>
						)}
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{/* 🔄 Loading */}
				{loadingDokumentasiSPPD && <DokumentasiSPPDSkeleton />}

				{/* 📭 Empty */}
				{!loadingDokumentasiSPPD && dataDokumentasiSPPD?.length === 0 && (
					<DokumentasiSPPDEmpty />
				)}

				{/* 🖼 Data */}
				{!loadingDokumentasiSPPD &&
					dataDokumentasiSPPD?.map((item, idx) => (
						<div
							key={idx}
							className="group relative overflow-hidden rounded-md"
						>
							<img
								src={item?.file_url}
								alt={item?.created_at}
								className="aspect-square w-full object-cover duration-300 transition-all  group-hover:scale-105"
							/>
							<ButtonDelete rowData={item} />
						</div>
					))}
			</div>
		</div>
	);
}
