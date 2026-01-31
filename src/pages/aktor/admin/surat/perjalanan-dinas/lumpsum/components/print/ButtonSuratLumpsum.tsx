import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import dayjs from "dayjs";
import type { ProfilOrganisasi } from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil/model";
import type { LumpsumSPPD } from "../../model";
import type { SuratTugasByID } from "../../../surat-tugas/list-surat-tugas/model";
import { Printer } from "lucide-react";
import {
	generatePdfSuratTugasLumpsum,
	type SuratTugasLumpsum,
} from "./generatePDFSuratTugasLumpsum";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratLumpsum({
	detailSuratTugas,
	kopSurat,
	profil,
	data,
}: {
	detailSuratTugas: SuratTugasByID;
	kopSurat: KopSurat;
	profil: ProfilOrganisasi;
	data: LumpsumSPPD;
}) {
	const dataSuratTugasLumpsum = (lumpsum: LumpsumSPPD): SuratTugasLumpsum => {
		return {
			kabupaten: profil?.kabupaten,
			bendahara: {
				nama: lumpsum?.nama_bendahara || "-",
				nip: lumpsum?.nip_bendahara || "",
			},
			kop_surat: kopSurat,
			lampiran_spd_nomor: detailSuratTugas?.format_nomor_surat || "",
			penerima: {
				nama: lumpsum?.nama_pegawai || "-",
				nip: lumpsum?.nip || "",
			},
			ppkom: {
				nama: detailSuratTugas?.penandatangan || "-",
				nip: detailSuratTugas?.nip_penandatangan || "",
				jabatan: detailSuratTugas?.jabatan_penandatangan || "-",
			},
			rincian: lumpsum?.items,
			tanggal: dayjs(detailSuratTugas?.tanggal_surat)
				.locale("id")
				.format("DD MMMM YYYY"),
			nama_jabatan_utama: lumpsum?.nama_jabatan_utama || "",
		};
	};

	const handlePrintLumpsumm = (lumpsum: LumpsumSPPD) => {
		pdfMake
			.createPdf(generatePdfSuratTugasLumpsum(dataSuratTugasLumpsum(lumpsum)))
			.print();
	};

	return (
		<>
			<button
				type="button"
				disabled={Number(data?.total_lumpsum) <= 0}
				onClick={() => {
					handlePrintLumpsumm(data);
				}}
				className="bg-[#161646] disabled:bg-slate-100 disabled:border-[#161646] disabled:border disabled:text-[#161646] p-2 rounded-md text-white"
			>
				<Printer size={12} />
			</button>
		</>
	);
}
