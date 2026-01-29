import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { KopSurat } from "../model";

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
		font: font && font.trim() !== "" ? font : "Roboto", // ✅ FIX UTAMA
		bold: style?.toLowerCase() === "bold",
		italics: style?.toLowerCase() === "italic",
		fontSize: Number(size) || 12, // ✅ fallback aman
	};
}

export function generatePdfDefinition(data: KopSurat): TDocumentDefinitions {
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
	} = data;

	const contentTexts = [
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
						text: isi_6 || "",
						...mapStyle({
							font: jenis_font_6,
							style: gaya_font_6,
							size: ukuran_font_6,
						}),
					},
				]
			: []),
	]?.filter((item) => item?.text && item?.text?.trim() !== "");

	return {
		defaultStyle: {
			font: "Roboto",
		},
		content: [
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 80,
								height: 80,
							},
							{
								width: "*",
								alignment: "center",
								stack: contentTexts,
							},
						]
					: [
							{
								width: "*",
								alignment: "center",
								stack: contentTexts,
							},
						],
				columnGap: 10,
				margin: [0, 0, 0, 10],
			},
			{
				canvas: [
					{
						type: "line",
						x1: 0,
						y1: 0,
						x2: 515,
						y2: 0,
						lineWidth: 1.5,
					},
				],
				margin: [0, 5, 0, 20],
			},
		],
	};
}
