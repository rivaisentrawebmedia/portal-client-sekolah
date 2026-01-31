import dayjs from "dayjs";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";
import type { DokumentasiSPPD } from "../model";
import type { SuratTugasByID } from "../../surat-tugas/list-surat-tugas/model";
import type { TDocumentDefinitions, Content } from "pdfmake/interfaces";

export type SuratTugasDokumentasi = {
	kop_surat: KopSurat;
	dokumentasi: DokumentasiSPPD[];
	surat: SuratTugasByID;
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
		font: font && font.trim() !== "" ? font : "Roboto",
		bold: style?.toLowerCase() === "bold",
		italics: style?.toLowerCase() === "italic",
		fontSize: Number(size) || 12,
	};
}

export function generatePdfSuratTugasDokumentasi(
	data: SuratTugasDokumentasi,
): TDocumentDefinitions {
	const { kop_surat, dokumentasi, surat } = data;

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

	// ===== helper render dokumentasi =====
	const renderDokumentasi = (): Content[] => {
		if (!dokumentasi || dokumentasi.length === 0) return [];

		const rows: Content[] = [];

		for (let i = 0; i < dokumentasi.length; i += 2) {
			const cols: Content[] = [
				{
					image: dokumentasi[i].base64,
					fit: [240, 180],
					alignment: "center",
					margin: [0, 0, 0, 10],
				},
			];

			if (dokumentasi[i + 1]) {
				cols.push({
					image: dokumentasi[i + 1].base64,
					fit: [240, 180],
					alignment: "center",
					margin: [0, 0, 0, 10],
				});
			} else {
				cols.push({ text: "" });
			}

			rows.push({
				columns: cols,
				columnGap: 15,
				margin: [0, 0, 0, 15],
			});
		}

		return [
			{
				margin: [0, 20, 0, 0],
				stack: rows,
			},
		];
	};

	return {
		pageSize: "A4",
		pageMargins: [40, 60, 40, 60],

		content: [
			// KOP SURAT
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 80,
								height: 80,
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

			// HEADER INFO
			{
				columns: [
					{
						width: "65%",
						table: {
							widths: ["45%", "5%", "*"],
							body: [
								[
									{ text: "Lampiran Surat Perintah Tugas", fontSize: 10 },
									{ text: ":" },
									{ text: surat?.format_nomor_surat || "-", fontSize: 10 },
								],
								[
									{ text: "Kegiatan", fontSize: 10 },
									{ text: ":" },
									{
										stack:
											Array.isArray(surat?.kegiatan) &&
											surat.kegiatan.length > 0
												? surat.kegiatan.map((k, i) => ({
														text: `${i + 1}. ${k}`,
													}))
												: [{ text: "-" }],
									},
								],
							],
						},
						layout: "noBorders",
					},
					{
						width: "35%",
						text: `Tanggal, ${dayjs(surat?.tanggal_surat)
							.locale("id")
							.format("DD MMMM YYYY")}`,
						fontSize: 10,
						alignment: "right",
					},
				],
				margin: [0, 0, 0, 15],
			},

			// JUDUL
			{
				text: "Dokumentasi Kegiatan",
				alignment: "center",
				bold: true,
				fontSize: 15,
				margin: [0, 0, 0, 10],
			},

			// DOKUMENTASI
			...renderDokumentasi(),
		],

		defaultStyle: {
			font: "Roboto",
			fontSize: 10,
			lineHeight: 1.3,
		},
	};
}
