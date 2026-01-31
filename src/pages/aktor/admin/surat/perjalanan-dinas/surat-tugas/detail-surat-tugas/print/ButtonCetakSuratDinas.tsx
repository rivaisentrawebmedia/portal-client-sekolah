import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import dayjs from "dayjs";
import {
	generatePdfSuratTugas,
	type SuratTugas,
} from "./generatePDFSuratTugas";
import type { ProfilOrganisasi } from "@/pages/aktor/admin/portal-admin/profil-organisasi/profil/model";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratDinas({
	detailSuratTugas,
	kopSurat,
	profil,
}: {
	detailSuratTugas: SuratTugasByID;
	kopSurat: KopSurat;
	profil: ProfilOrganisasi;
}) {
	const dataSuratTugas: SuratTugas = {
		kop_surat: kopSurat,
		kegiatan: detailSuratTugas?.kegiatan || [],
		list_pegawai: detailSuratTugas?.list_pegawai || [],
		nomor_surat: detailSuratTugas?.format_nomor_surat || "",
		pejabat_penandatangan: {
			jabatan: detailSuratTugas?.jabatan_penandatangan,
			nama: detailSuratTugas?.penandatangan,
			nip: detailSuratTugas?.nip_penandatangan,
		},
		instansi: profil?.nama_sekolah,
		tanggal_mulai: dayjs(detailSuratTugas?.tanggal_mulai)
			.locale("id")
			.format("DD MMMM YYYY"),
		tanggal_selesai: dayjs(detailSuratTugas?.tanggal_selesai)
			.locale("id")
			.format("DD MMMM YYYY"),
		tanggal_surat: dayjs(detailSuratTugas?.tanggal_surat)
			.locale("id")
			.format("DD MMMM YYYY"),
		kabupaten: profil?.kabupaten,
		dasar: detailSuratTugas?.dasar_surat_tugas || [],
		nama_jabatan_utama: detailSuratTugas?.jabatan_penandatangan,
	};

	const handlePrint = () => {
		pdfMake.createPdf(generatePdfSuratTugas(dataSuratTugas)).print();
	};

	return (
		<>
			<Button
				onClick={handlePrint}
				type="button"
				className="bg-[#161646] hover:bg-[#161646]/80"
			>
				<FaPrint />
				Cetak Surat Tugas
			</Button>
		</>
	);
}
