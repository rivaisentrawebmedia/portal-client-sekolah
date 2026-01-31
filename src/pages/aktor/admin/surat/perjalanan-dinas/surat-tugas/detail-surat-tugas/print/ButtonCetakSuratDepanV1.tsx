import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import { MenubarItem } from "@/components/ui/menubar";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import { generatePdfSuratTugasDepanV1 } from "./generatePDFSuratTugasDepan";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratDepanV1({
	detailSuratTugas,
	kabupaten,
	kop_surat,
}: {
	detailSuratTugas: SuratTugasByID;
	kop_surat: KopSurat;
	kabupaten: string;
}) {
	const handlePrintSuratDepanV1 = () => {
		pdfMake
			.createPdf(
				generatePdfSuratTugasDepanV1(detailSuratTugas, kop_surat, kabupaten),
			)
			.print();
	};

	return (
		<>
			<MenubarItem
				onClick={() => {
					handlePrintSuratDepanV1();
				}}
			>
				<FaPrint color="#888" />
				Cetak Depan V1
			</MenubarItem>
		</>
	);
}
