import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import dayjs from "dayjs";
import type { ProfilOrganisasi } from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil/model";
import {
	generatePdfSuratTugasKwitasi,
	type DataKwitansi,
} from "./generatePDFSuratTugasKwitansi";
import type { LumpsumSPPD } from "../../model";
import type { SuratTugasByID } from "../../../surat-tugas/list-surat-tugas/model";
import { Printer } from "lucide-react";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratKwitansi({
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
	const dataSuratTugasKuitansi = (lumpsum: LumpsumSPPD): DataKwitansi => {
		return {
			kop_surat: kopSurat,
			no_surat: detailSuratTugas?.format_nomor_surat || "",
			pegawai: {
				nama: lumpsum?.nama_pegawai || "-",
				nip: lumpsum?.nip || "",
			},
			ppkom: {
				nama: detailSuratTugas?.penandatangan || "-",
				nip: detailSuratTugas?.nip_penandatangan || "",
				jabatan: detailSuratTugas?.jabatan_penandatangan || "-",
			},
			bendahara: {
				nama: lumpsum?.nama_bendahara || "-",
				nip: lumpsum?.nip_bendahara || "",
			},
			tgl_surat: detailSuratTugas?.tanggal_surat
				? dayjs(detailSuratTugas?.tanggal_surat)
						.locale("id")
						.format("DD MMMM YYYY")
				: "-",
			tgl_mulai: detailSuratTugas?.tanggal_mulai
				? dayjs(detailSuratTugas?.tanggal_mulai)
						.locale("id")
						.format("DD MMMM YYYY")
				: "-",
			tgl_selesai: detailSuratTugas?.tanggal_selesai
				? dayjs(detailSuratTugas?.tanggal_selesai)
						.locale("id")
						.format("DD MMMM YYYY")
				: "-",
			tanggal: dayjs().locale("id").format("DD MMMM YYYY"),
			rincian: lumpsum?.items || [],
			nama_desa: profil?.nama_sekolah,
		};
	};

	const handlePrintKwitansi = (lumpsum: LumpsumSPPD) => {
		pdfMake
			.createPdf(generatePdfSuratTugasKwitasi(dataSuratTugasKuitansi(lumpsum)))
			.print();
	};

	return (
		<>
			<button
				type="button"
				disabled={Number(data?.total_ril) <= 0}
				onClick={() => {
					handlePrintKwitansi(data);
				}}
				className="bg-[#161646] disabled:bg-slate-100 disabled:border-[#161646] disabled:border disabled:text-[#161646] p-2 rounded-md text-white"
			>
				<Printer size={12} />
			</button>
		</>
	);
}
