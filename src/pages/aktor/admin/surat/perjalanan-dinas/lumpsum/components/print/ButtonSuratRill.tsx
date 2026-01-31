import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import dayjs from "dayjs";
import type { LumpsumSPPD } from "../../model";
import type { SuratTugasByID } from "../../../surat-tugas/list-surat-tugas/model";
import {
	generatePdfSuratTugasRiil,
	type DataRiil,
} from "./generatePDFSuratTugasRill";
import { Printer } from "lucide-react";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratRiil({
	detailSuratTugas,
	kopSurat,
	data,
}: {
	detailSuratTugas: SuratTugasByID;
	kopSurat: KopSurat;
	data: LumpsumSPPD;
}) {
	const dataSuratTugasRill = (lumpsum: LumpsumSPPD): DataRiil => {
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
			penandatangan: {
				nama: lumpsum?.nama_pegawai || "-",
				nip: lumpsum?.nip || "",
				jabatan: lumpsum?.jabatan_pegawai || "-",
			},
			tgl_surat: detailSuratTugas?.tanggal_surat
				? dayjs(detailSuratTugas?.tanggal_surat)
						.locale("id")
						.format("DD MMMM YYYY")
				: "-",
			tanggal: dayjs().locale("id").format("DD MMMM YYYY"),
			rincian: lumpsum?.items?.filter((item) => item?.ril),
		};
	};

	const handlePrintRiil = (lumpsum: LumpsumSPPD) => {
		pdfMake
			.createPdf(generatePdfSuratTugasRiil(dataSuratTugasRill(lumpsum)))
			.print();
	};

	return (
		<>
			<button
				type="button"
				disabled={Number(data?.total_ril) <= 0}
				onClick={() => {
					handlePrintRiil(data);
				}}
				className="bg-[#161646] disabled:bg-slate-100 disabled:border-[#161646] disabled:border disabled:text-[#161646] p-2 rounded-md text-white"
			>
				<Printer size={12} />
			</button>
		</>
	);
}
