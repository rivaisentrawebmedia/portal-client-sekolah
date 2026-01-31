import dayjs from "dayjs";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";

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

export function generatePdfSuratTugasDepanV1(
	data: SuratTugasByID,
	kop_surat: KopSurat,
	kabupaten: string,
): TDocumentDefinitions {
	const {
		list_pegawai,
		tanggal_surat,
		penandatangan,
		nip_penandatangan,
		satuan_kerja,
		tempat_asal,
		tempat_tujuan,
		maksud_kegiatan,
		akun,
		jenis_transportasi,
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

	const header: Content = {
		margin: [40, 20, 40, 20],
		stack: [
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
			},
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 0],
			},
		],
	};

	const pages: Content[] = (list_pegawai || []).map((peg, index) => ({
		stack: [
			{
				columns: [
					{ width: "*", text: "" },
					{
						width: "50%",
						table: {
							widths: ["30%", "70%"],
							body: [
								["Lembar Ke", ":"],
								["Kode Nomor", ":"],
								["Nomor", `: ${data?.format_nomor_surat}`],
							],
						},
						layout: "noBorders",
						fontSize: 10,
					},
				],
			},

			{
				text: "SURAT PERINTAH PERJALANAN DINAS (SPPD)",
				alignment: "center",
				bold: true,
				fontSize: 15,
				decoration: "underline",
				margin: [0, 10, 0, 10],
			},

			// ================= ROW 1–7 (TIDAK DIUBAH) =================
			{
				table: {
					widths: ["48%", "52%"],
					body: [
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [["1.", "Pejabat Pembuat Komitmen"]],
								},
								layout: "noBorders",
							},
							penandatangan || "-",
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [["2.", "Nama / NIP Pegawai"]],
								},
								layout: "noBorders",
							},
							{
								text: [
									{ text: `${peg.nama}\n`, bold: true },
									peg?.nip ? { text: `NIP. ${peg.nip}` } : "",
								],
							},
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [
										["3.", "a. Pangkat dan Golongan"],
										["", "b. Jabatan/Instansi"],
										["", "c. Tingkat Biaya Perjalanan Dinas"],
									],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [
										["a."],
										[`b. ${peg.jabatan_kegiatan} / ${satuan_kerja}`],
										["c."],
									],
								},
								layout: "noBorders",
							},
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [["4.", "Maksud Perjalanan Dinas"]],
								},
								layout: "noBorders",
							},
							maksud_kegiatan || "-",
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [["5.", "Alat angkut yang dipergunakan"]],
								},
								layout: "noBorders",
							},
							jenis_transportasi || "-",
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [
										["6.", "a. Tempat Berangkat"],
										["", "b. Tujuan Berangkat"],
									],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [
										[`a. ${tempat_asal || "-"}`],
										[`b. ${tempat_tujuan || "-"}`],
									],
								},
								layout: "noBorders",
							},
						],
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [
										["7.", "a. Lamanya Perjalanan Dinas"],
										["", "b. Tanggal Berangkat"],
										["", "c. Tanggal Harus Kembali"],
									],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [
										[
											peg?.tanggal_keberangkatan && peg?.tanggal_kepulangan
												? `a. ${dayjs(peg.tanggal_kepulangan).diff(dayjs(peg.tanggal_keberangkatan), "day") + 1} hari`
												: "a. -",
										],
										[
											`b. ${peg?.tanggal_keberangkatan ? dayjs(peg.tanggal_keberangkatan).format("DD MMMM YYYY") : "-"}`,
										],
										[
											`c. ${peg?.tanggal_kepulangan ? dayjs(peg.tanggal_kepulangan).format("DD MMMM YYYY") : "-"}`,
										],
									],
								},
								layout: "noBorders",
							},
						],
					],
				},
				layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
				fontSize: 10,
			},

			// ================= ROW 8 =================
			{
				table: {
					widths: ["33%", "33%", "34%"],
					body: [
						[
							{
								table: {
									widths: ["15%", "85%"],
									body: [
										[{ text: "8.", rowSpan: 5 }, "Pengikut: Nama"],
										["", "a."],
										["", "b."],
										["", "c."],
										["", "d."],
									],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [["Tanggal Lahir"], [""], [""], [""], [""]],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [["Keterangan"], [""], [""], [""], [""]],
								},
								layout: "noBorders",
							},
						],
					],
				},
				layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
				fontSize: 10,
			},

			// ================= ROW 9 =================
			{
				table: {
					widths: ["48%", "52%"],
					body: [
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [
										["9.", "Pembebanan Anggaran"],
										["", "a. Instansi"],
										["", "b. Akun Rekening Anggaran"],
									],
								},
								layout: "noBorders",
							},
							{
								table: {
									widths: ["*"],
									body: [[""], [`a. ${satuan_kerja}`], [`b. ${akun || "-"}`]],
								},
								layout: "noBorders",
							},
						],
					],
				},
				layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
				fontSize: 10,
			},

			// ================= ROW 10 =================
			{
				table: {
					widths: ["48%", "52%"],
					body: [
						[
							{
								table: {
									widths: ["10%", "90%"],
									body: [["10.", "Keterangan Lain-lain"]],
								},
								layout: "noBorders",
							},
							"",
						],
					],
				},
				layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
				fontSize: 10,
			},

			{
				text: "*) Coret yang tidak perlu",
				fontSize: 10,
				margin: [0, 10, 0, 20],
			},

			{
				columns: [
					{ width: "*", text: "" },
					{
						width: "50%",
						stack: [
							{
								table: {
									widths: ["40%", "60%"],
									body: [
										["Dikeluarkan di", `: ${kabupaten}`],
										["Pada Tanggal", `: ${tanggal_surat}`],
									],
								},
								layout: "noBorders",
								fontSize: 10,
							},
							{
								text: `${data.jabatan_penandatangan},`,
								bold: true,
								margin: [0, 0, 0, 50],
								fontSize: 10,
							},
							{ text: penandatangan, bold: true, fontSize: 10 },
							nip_penandatangan
								? { text: `NIP. ${nip_penandatangan}`, fontSize: 10 }
								: "",
						],
					},
				],
			},
		],
		...(index > 0 ? { pageBreak: "before" } : {}),
	}));

	return {
		header,
		content: pages,
		pageMargins: [40, 120, 40, 40],
	};
}
