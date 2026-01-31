import type {
	TDocumentDefinitions,
	Content,
	TableCell,
} from "pdfmake/interfaces";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";

export type SuratTugasLaporan = {
	kop_surat: KopSurat;
	kota: string;
	tanggal_surat: string;
	nama_desa: string;
	kecamatan: string;
	di: string;
	perihal: string;
	isi: string;
	dasar_pelaksanaan: string;
	nama_pegawai: string[];
	tempat_tujuan: string;
	tanggal_tujuan: string;
	laporan: string[];
	tindak_lanjut: string;
	saran: string;
};

function mapStyle({
	font,
	style,
	size,
}: {
	font?: string;
	style?: string;
	size?: string;
}) {
	return {
		font: font || "Roboto",
		bold: style?.toLowerCase() === "bold",
		italics: style?.toLowerCase() === "italic",
		fontSize: Number(size) || 10,
	};
}

export function generatePdfLaporan(
	data: SuratTugasLaporan,
): TDocumentDefinitions {
	const {
		kop_surat,
		kota,
		tanggal_surat,
		nama_desa,
		kecamatan,
		di,
		perihal,
		isi,
		dasar_pelaksanaan,
		nama_pegawai,
		tempat_tujuan,
		tanggal_tujuan,
		laporan,
		tindak_lanjut,
		saran,
	} = data;

	const {
		logo_base64,
		isi_1,
		jenis_font_1,
		gaya_font_1,
		ukuran_font_1,
		isi_2,
		jenis_font_2,
		gaya_font_2,
		ukuran_font_2,
		isi_3,
		jenis_font_3,
		gaya_font_3,
		ukuran_font_3,
		isi_4,
		jenis_font_4,
		gaya_font_4,
		ukuran_font_4,
		isi_5,
		jenis_font_5,
		gaya_font_5,
		ukuran_font_5,
		isi_6,
		jenis_font_6,
		gaya_font_6,
		ukuran_font_6,
	} = kop_surat;

	const contentTexts: Content[] = [
		{
			text: isi_1 || "",
			...mapStyle({
				font: jenis_font_1,
				style: gaya_font_1,
				size: ukuran_font_1,
			}),
		},
		{
			text: isi_2 || "",
			...mapStyle({
				font: jenis_font_2,
				style: gaya_font_2,
				size: ukuran_font_2,
			}),
		},
		{
			text: isi_3 || "",
			...mapStyle({
				font: jenis_font_3,
				style: gaya_font_3,
				size: ukuran_font_3,
			}),
		},
		{
			text: isi_4 || "",
			...mapStyle({
				font: jenis_font_4,
				style: gaya_font_4,
				size: ukuran_font_4,
			}),
		},
		{
			text: isi_5 || "",
			...mapStyle({
				font: jenis_font_5,
				style: gaya_font_5,
				size: ukuran_font_5,
			}),
		},
		...(isi_6
			? [
					{
						text: isi_6,
						...mapStyle({
							font: jenis_font_6,
							style: gaya_font_6,
							size: ukuran_font_6,
						}),
					},
				]
			: []),
	];

	const namaPegawaiList = nama_pegawai
		.map((n, i) => `${i + 1}. ${n}`)
		.join("\n");

	const laporanList = laporan.map((l, i) => `${i + 1}. ${l}`).join("\n");

	// =============================
	// TABEL TANDA TANGAN (FIX UTAMA)
	// =============================
	const tandaTanganBody: TableCell[][] = [
		[
			{ text: "No", bold: true, alignment: "center", fillColor: "#E4E0F5" },
			{ text: "Nama", bold: true, fillColor: "#E4E0F5" },
			{
				text: "Tanda Tangan",
				bold: true,
				alignment: "center",
				fillColor: "#E4E0F5",
			},
		],
		...nama_pegawai.map((nama, i): TableCell[] => {
			const isEven = i % 2 === 1;
			return [
				{ text: String(i + 1), alignment: "center" },
				{ text: nama },
				{
					stack: [
						{
							text: `${i + 1}.`,
							alignment: isEven ? "center" : "left",
						},
					] as Content[],
				},
			];
		}),
	];

	return {
		pageSize: "A4",
		pageMargins: [40, 60, 40, 60],
		defaultStyle: {
			fontSize: 10,
			lineHeight: 1.2,
		},

		content: [
			// KOP SURAT
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 70,
								height: 70,
							},
							{ width: "*", alignment: "center", stack: contentTexts },
						]
					: [{ width: "*", alignment: "center", stack: contentTexts }],
				columnGap: 10,
				margin: [0, 0, 0, 10],
			},

			// GARIS
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},

			// HEADER SURAT
			{
				columns: [
					{ width: "50%", text: "" },
					{
						width: "50%",
						text: `${kota}, ${tanggal_surat}\nKepada\nYth, Kepala ${nama_desa}\n${kecamatan}\n${kota}\nDi - ${di}`,
					},
				],
			},

			// PERIHAL
			{
				text: [{ text: "Perihal: " }, { text: perihal, bold: true }],
				margin: [0, 10, 0, 10],
			},

			// PEMBUKA
			{
				text: [{ text: isi, bold: true }, ", sebagai berikut:"],
			},

			// TABEL URAIAN
			{
				table: {
					widths: ["6%", "30%", "*"],
					body: [
						[
							{
								text: "No",
								bold: true,
								alignment: "center",
								fillColor: "#E4E0F5",
							},
							{ text: "Uraian", bold: true, fillColor: "#E4E0F5" },
							{ text: "Penjelasan", bold: true, fillColor: "#E4E0F5" },
						],
						[
							{ text: "1", alignment: "center" },
							"Dasar Pelaksanaan",
							dasar_pelaksanaan,
						],
						[
							{ text: "2", alignment: "center" },
							"Nama Pegawai",
							namaPegawaiList,
						],
						[
							{ text: "3", alignment: "center" },
							"Tempat / Tanggal",
							`${tempat_tujuan}\n${tanggal_tujuan}`,
						],
						[{ text: "4", alignment: "center" }, "Laporan", laporanList],
						[
							{ text: "5", alignment: "center" },
							"Tindak Lanjut",
							tindak_lanjut,
						],
						[{ text: "6", alignment: "center" }, "Saran", saran],
					],
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => "#E2E2E3",
					vLineColor: () => "#E2E2E3",
				},
				margin: [0, 20, 0, 20],
			},

			{
				text: "Demikian laporan ini disampaikan kepada Bapak, mohon petunjuk untuk selanjutnya dapat dipedomani dan dilaksanakan.",
				margin: [0, 0, 0, 20],
			},

			// TABEL TANDA TANGAN
			{
				columns: [
					{ width: "40%", text: "" },
					{
						width: "60%",
						stack: [
							{
								table: {
									widths: [20, "*", "40%"],
									body: tandaTanganBody,
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
								},
							},
						] as Content[],
						margin: [0, 0, 0, 20],
					},
				],
			},
		],

		footer(currentPage, pageCount) {
			return {
				text: `Halaman ${currentPage} dari ${pageCount}`,
				alignment: "center",
				fontSize: 9,
				margin: [0, 10, 0, 0],
			};
		},
	};
}
