import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import { MenubarItem } from "@/components/ui/menubar";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import { generatePdfSuratTugasDepanV2 } from "./generatePDFSuratTugasDepanV2";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratDepanV2({
	detailSuratTugas,
	kabupaten,
	kop_surat,
}: {
	detailSuratTugas: SuratTugasByID;
	kop_surat: KopSurat;
	kabupaten: string;
}) {
	const handlePrintSuratDepanV2 = () => {
		pdfMake
			.createPdf(
				generatePdfSuratTugasDepanV2(detailSuratTugas, kop_surat, kabupaten),
			)
			.print();
	};

	return (
		<>
			<MenubarItem
				onClick={() => {
					handlePrintSuratDepanV2();
				}}
			>
				<FaPrint color="#888" />
				Cetak Depan V2
			</MenubarItem>
		</>
	);
}
