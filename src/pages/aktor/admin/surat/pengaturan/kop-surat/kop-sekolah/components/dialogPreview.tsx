import { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import DocumentActions from "./documentAction";
import { generatePdfDefinition } from "./generatePDFDefenition";
import type { KopSurat } from "../model";
import PDFPreview from "./pdfPreview";

/* =========================
   FONT VIA HTTPS (VPS URL)
   ========================= */
pdfMake.addFonts({
	"Times New Roman": {
		normal:
			"https://devsuperadmin-digitaldesa.avnet.id/client-file/01K0X65RXMRYR5E07KV36ATDF7.ttf",
		bold: "https://devsuperadmin-digitaldesa.avnet.id/client-file/01K0X7V9G04TFM3BCFMXHPC4BG.ttf",
		italics:
			"https://devsuperadmin-digitaldesa.avnet.id/client-file/01K0X65RKH8NAA05EN6WNREW4K.ttf",
		bolditalics:
			"https://devsuperadmin-digitaldesa.avnet.id/client-file/01K0X7V97D2W8RNHJA7WCQECBB.ttf",
	},
	Roboto: {
		normal:
			"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
		bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
		italics:
			"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
		bolditalics:
			"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
	},
});

type PdfDocGenerator = {
	getBlob: (cb: (blob: Blob) => void) => void;
};

export function DialogPreview({ data }: { data: KopSurat }) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	const handleDownload = () => {
		pdfMake.createPdf(generatePdfDefinition(data)).download("kop-surat.pdf");
	};

	const handlePrint = () => {
		pdfMake.createPdf(generatePdfDefinition(data)).print();
	};

	const handleOpen = () => {
		pdfMake.createPdf(generatePdfDefinition(data)).open();
	};

	useEffect(() => {
		const generatePdf = async () => {
			const pdfDocGenerator = pdfMake.createPdf(
				generatePdfDefinition(data),
			) as unknown as PdfDocGenerator;

			pdfDocGenerator.getBlob((blob) => {
				const url = URL.createObjectURL(blob);
				setPdfUrl(url);
			});
		};

		generatePdf();
	}, [data]);

	return (
		<div className="scrollbar flex h-full w-full flex-col gap-16 overflow-auto">
			<div className="flex items-center justify-end gap-32">
				<DocumentActions
					onOpen={handleOpen}
					onPrint={handlePrint}
					onDownload={handleDownload}
				/>
			</div>

			<PDFPreview pdfUrl={pdfUrl} />
		</div>
	);
}
