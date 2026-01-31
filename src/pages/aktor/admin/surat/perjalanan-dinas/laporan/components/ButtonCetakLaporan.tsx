import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from "dayjs";
import type { ProfilOrganisasi } from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil/model";
import {
	generatePdfLaporan,
	type SuratTugasLaporan,
} from "./generatePDFLaporan";
import type { LaporanSPPD } from "../model";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakLaporan({
	kopSurat,
	profil,
	data,
}: {
	kopSurat: KopSurat;
	profil: ProfilOrganisasi;
	data: LaporanSPPD;
}) {
	const handlePrintLaporan = async () => {
		const dataSurat: SuratTugasLaporan = {
			kop_surat: kopSurat,
			dasar_pelaksanaan: data?.dasar_pelaksanaan || "-",
			di: profil?.kabupaten || "-",
			isi: data?.isi || "-",
			kecamatan: profil?.kecamatan || "-",
			kota: profil?.kabupaten || "-",
			laporan: data?.laporan_pelaksanaan || [],
			nama_desa: profil?.nama_sekolah || "-",
			nama_pegawai: data?.yang_ditugaskan || [],
			perihal: data?.perihal || "-",
			saran: data?.saran || "-",
			tanggal_surat: data?.tanggal_surat
				? dayjs(data?.tanggal_surat).locale("id").format("DD MMMM YYYY")
				: "-",
			tanggal_tujuan: data?.tanggal_sppd
				? dayjs(data?.tanggal_sppd).locale("id").format("DD MMMM YYYY")
				: "-",
			tempat_tujuan: data?.tempat_kegiatan || "-",
			tindak_lanjut: data?.tindak_lanjut || "-",
		};

		pdfMake.createPdf(generatePdfLaporan(dataSurat)).print();
	};

	return (
		<>
			<Button
				onClick={handlePrintLaporan}
				type="button"
				className="bg-[#161646] hover:bg-[#161646]/80"
			>
				<FaPrint />
				Cetak Surat Tugas
			</Button>
		</>
	);
}
