import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {
	generatePdfSuratTugasDokumentasi,
	type SuratTugasDokumentasi,
} from "./generatePDFDokumentasi";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";
import type { DokumentasiSPPD } from "../model";
import type { SuratTugasByID } from "../../surat-tugas/list-surat-tugas/model";
import { imageUrlToBase64 } from "@/utils/imageTOBase64";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakDokumentasi({
	kopSurat,
	surat,
	data,
}: {
	kopSurat: KopSurat;
	surat: SuratTugasByID;
	data: DokumentasiSPPD[];
}) {
	const handlePrintSuratTugasDokumentasi = async () => {
		try {
			// 🔥 convert semua image URL → base64
			const dokumentasiWithBase64 = await Promise.all(
				(data || []).map(async (item) => ({
					...item,
					base64: await imageUrlToBase64(item.file_url),
				})),
			);

			const dataSurat: SuratTugasDokumentasi = {
				kop_surat: kopSurat,
				dokumentasi: dokumentasiWithBase64 as any, // ⬅ karena PDF expect base64
				surat,
			};

			pdfMake.createPdf(generatePdfSuratTugasDokumentasi(dataSurat)).print();
		} catch (error) {
			console.error("Gagal mencetak dokumentasi:", error);
			alert("Gagal memuat gambar dokumentasi");
		}
	};

	return (
		<Button
			onClick={handlePrintSuratTugasDokumentasi}
			type="button"
			className="bg-[#161646] hover:bg-[#161646]/80"
		>
			<FaPrint />
			Cetak Surat Tugas
		</Button>
	);
}
