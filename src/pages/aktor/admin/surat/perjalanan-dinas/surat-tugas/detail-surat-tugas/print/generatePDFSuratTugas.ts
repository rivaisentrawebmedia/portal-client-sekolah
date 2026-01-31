import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";

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

export type SuratTugas = {
	kop_surat: KopSurat;
	nomor_surat: string;
	pejabat_penandatangan: {
		nama: string;
		jabatan: string;
		nip: string;
	};
	list_pegawai: Array<{
		pegawai_id: string;
		jabatan_kegiatan: string;
		urutan: number;
		nama: string;
		nip: string;
	}>;
	kegiatan: string[];
	dasar: string[];
	instansi: string;
	tanggal_mulai: string; // contoh: '15 Mei 2025'
	tanggal_selesai: string; // contoh: '16 Mei 2025'
	tanggal_surat: string; // contoh: '08 Mei 2025'
	kabupaten: string;
	nama_jabatan_utama: string;
};

export function generatePdfSuratTugas(data: SuratTugas): TDocumentDefinitions {
	const {
		kop_surat,
		nomor_surat,
		pejabat_penandatangan,
		list_pegawai,
		kegiatan,
		tanggal_mulai,
		tanggal_selesai,
		dasar,
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
	];

	return {
		content: [
			// 1️⃣ Kop Surat
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
			// 2️⃣ Garis
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},
			// 3️⃣ Judul & Nomor Surat
			{
				text: "SURAT PERINTAH TUGAS",
				alignment: "center",
				bold: true,
				fontSize: 15,
				decoration: "underline",
				margin: [0, 0, 0, 5],
			},
			{
				text: `Nomor: ${nomor_surat}`,
				alignment: "center",
				margin: [0, 0, 0, 20],
				fontSize: 10,
			},
			// 4️⃣ Paragraf penugasan
			{
				table: {
					widths: ["10%", "*"], // Kolom: Label & Konten
					body: [
						[
							{ text: "Dasar:" }, // Label tetap
							Array.isArray(dasar) && dasar.length > 0
								? {
										table: {
											widths: ["3%", "*"], // Kolom: Nomor & Isi teks
											body: dasar.map((item, index) => [
												{ text: `${index + 1}.`, alignment: "left" }, // Nomor
												{ text: item }, // Isi teks
											]),
										},
										layout: "noBorders",
									}
								: { text: "-" }, // Fallback jika kosong
						],
					],
				},
				fontSize: 10,
				layout: "noBorders",
				margin: [0, 0, 0, 20],
			},
			{
				text: "Memberikan Tugas Kepada:",
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			{
				table: {
					widths: ["5%", "25%", "35%", "35%"],
					body: [
						[
							{ text: "No", bold: true, alignment: "center" },
							{ text: "Nama", bold: true },
							{ text: "NIP", bold: true },
							{ text: "Jabatan", bold: true, alignment: "center" },
						],
						...(list_pegawai?.length
							? list_pegawai.map((peg, i) => [
									{ text: String(i + 1), alignment: "center" },
									{ text: peg.nama ?? "-", alignment: "left" },
									{ text: peg.nip ?? "-", alignment: "left" },
									{ text: peg.jabatan_kegiatan ?? "-", alignment: "left" },
								])
							: [[{ text: "-", colSpan: 4, alignment: "center" }, {}, {}, {}]]),
					] as any,
				},
				fontSize: 10,
			},

			{
				table: {
					widths: ["10%", "*"], // Kolom: Label & Konten
					body: [
						[
							{ text: "Untuk:" }, // Label tetap
							Array.isArray(kegiatan) && kegiatan.length > 0
								? {
										table: {
											widths: ["3%", "*"], // Kolom: Nomor & Isi teks
											body: kegiatan.map((item, index) => [
												{ text: `${index + 1}.`, alignment: "left" }, // Nomor
												{ text: item }, // Isi teks
											]),
										},
										layout: "noBorders",
									}
								: { text: "-" }, // Fallback jika kosong
						],
					],
				},
				fontSize: 10,
				layout: "noBorders",
				margin: [0, 10, 0, 20],
			},
			{
				text:
					tanggal_mulai === tanggal_selesai
						? `Surat tugas ini berlaku pada tanggal ${tanggal_mulai}.`
						: `Surat tugas ini berlaku dari tanggal ${tanggal_mulai} sampai tanggal ${tanggal_selesai}.`,
				margin: [0, 0, 0, 5],
				fontSize: 10,
			},
			{
				text: `Demikian Surat Tugas ini dibuat untuk dilaksanakan sebagaimana mestinya.`,
				margin: [0, 0, 0, 20],
				fontSize: 10,
			},
			// 7️⃣ Tanggal & TTD

			{
				columns: [
					{
						width: "*",
						text: "",
					},
					{
						width: "40%",
						alignment: "left",
						stack: [
							{
								table: {
									widths: ["35%", "*"],
									body: [
										[
											{ text: "Dikeluarkan di", fontSize: 10 },
											{ text: `: ${data.kabupaten}`, fontSize: 10 },
										],
										[
											{ text: "Pada Tanggal", fontSize: 10 },
											{ text: `: ${data?.tanggal_surat}`, fontSize: 10 },
										],
									],
								},
								layout: "noBorders",
								margin: [0, 0, 0, 5],
							},
							{
								canvas: [
									{
										type: "line",
										x1: 0,
										y1: 0,
										x2: 200,
										y2: 0,
										lineWidth: 0.5,
									},
								],
								margin: [0, 0, 0, 5],
							},

							{
								text: pejabat_penandatangan?.jabatan ?? "",
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 50],
							},
							{
								text: pejabat_penandatangan?.nama ?? "",
								bold: true,
								fontSize: 10,
							},

							...(pejabat_penandatangan?.nip?.trim()
								? [
										{
											text: `NIP. ${pejabat_penandatangan.nip}`,
											fontSize: 10,
										},
									]
								: []),
						],
					},
				],
				columnGap: 0,
			},
		],
	};
}
