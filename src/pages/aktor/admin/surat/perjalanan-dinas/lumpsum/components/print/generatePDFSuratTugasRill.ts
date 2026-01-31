import type {
	Content,
	ContentStack,
	ContentText,
	TableCell,
	TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import type { ItemsLumpsum } from "../../model";
import { formatRupiah, toRoman } from "@/utils/helpers";

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

const txt = (text: string, options?: Partial<ContentText>): ContentText => ({
	text,
	...options,
});

const stk = (stack: Content[]): ContentStack => ({
	stack,
});

export type DataRiil = {
	kop_surat: KopSurat;
	penandatangan: {
		nama: string;
		nip: string;
		jabatan: string;
	};
	pegawai: {
		nama: string;
		nip: string;
	};
	ppkom: {
		nama: string;
		nip: string;
		jabatan: string;
	};
	no_surat: string;
	tgl_surat: string;
	tanggal: string;
	rincian: ItemsLumpsum[];
};

export function generatePdfSuratTugasRiil(
	data: DataRiil,
): TDocumentDefinitions {
	const total = data.rincian.reduce(
		(acc, cur) => acc + Number(cur.qty) * Number(cur.harga),
		0,
	);

	const contentTexts = [
		{
			text: data.kop_surat.isi_1 || "",
			...mapStyle({
				font: data.kop_surat.jenis_font_1,
				style: data.kop_surat.gaya_font_1,
				size: data.kop_surat.ukuran_font_1,
			}),
		},
		{
			text: data.kop_surat.isi_2 || "",
			...mapStyle({
				font: data.kop_surat.jenis_font_2,
				style: data.kop_surat.gaya_font_2,
				size: data.kop_surat.ukuran_font_2,
			}),
		},
		{
			text: data.kop_surat.isi_3 || "",
			...mapStyle({
				font: data.kop_surat.jenis_font_3,
				style: data.kop_surat.gaya_font_3,
				size: data.kop_surat.ukuran_font_3,
			}),
		},
		{
			text: data.kop_surat.isi_4 || "",
			...mapStyle({
				font: data.kop_surat.jenis_font_4,
				style: data.kop_surat.gaya_font_4,
				size: data.kop_surat.ukuran_font_4,
			}),
		},
		{
			text: data.kop_surat.isi_5 || "",
			...mapStyle({
				font: data.kop_surat.jenis_font_5,
				style: data.kop_surat.gaya_font_5,
				size: data.kop_surat.ukuran_font_5,
			}),
		},
		...(data.kop_surat.isi_6
			? [
					{
						text: data.kop_surat.isi_6,
						...mapStyle({
							font: data.kop_surat.jenis_font_6,
							style: data.kop_surat.gaya_font_6,
							size: data.kop_surat.ukuran_font_6,
						}),
					},
				]
			: []),
	];

	return {
		defaultStyle: { fontSize: 10 },

		content: [
			/* ================= KOP SURAT ================= */
			{
				columns: data.kop_surat.logo_base64
					? [
							{
								image: `data:image/png;base64,${data.kop_surat.logo_base64}`,
								width: 80,
							},
							{
								width: "*",
								alignment: "center",
								stack: contentTexts.map((t) => txt(t.text, t)),
							},
						]
					: [
							{
								width: "*",
								alignment: "center",
								stack: contentTexts.map((t) => txt(t.text, t)),
							},
						],
				columnGap: 10,
				margin: [0, 0, 0, 10],
			},

			/* ================= GARIS ================= */
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},

			txt("DAFTAR PENGELUARAN RIIL", {
				alignment: "center",
				bold: true,
				fontSize: 11,
				margin: [0, 0, 0, 20],
			}),

			txt("Yang bertanda tangan di bawah ini:"),

			/* ================= IDENTITAS ================= */
			{
				table: {
					widths: ["30%", "70%"],
					body: [
						["Nama", `: ${data.penandatangan.nama}`],
						["NIP", `: ${data.penandatangan.nip}`],
						["Jabatan", `: ${data.penandatangan.jabatan}`],
					],
				},
				layout: "noBorders",
				margin: [20, 0, 0, 10],
			},

			{
				text: [
					`Berdasarkan SURAT PERINTAH PERJALANAN DINAS (SPPD) Nomor : `,
					{ text: `${data?.no_surat} ${data?.tgl_surat}`, italics: true },
					`, dengan ini kami menyatakan dengan sesungguhnya bahwa :\n`,
				],
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},

			{
				columns: [
					{ width: "4%", text: "1." }, // kiri filler
					{
						width: "96%",
						stack: [
							{
								text: `Biaya Transport Pegawai dan / atau biaya penginapan di bawah ini yang tidak dapat di peroleh bukti-bukti pengeluarannya, meliputi :`,
								margin: [0, 0, 0, 10],
							},
							{
								table: {
									widths: ["5%", "*", "20%"],
									body: [
										[
											txt("No", { bold: true, alignment: "center" }),
											txt("Uraian", { bold: true, alignment: "center" }),
											txt("Jumlah", { bold: true, alignment: "center" }),
										],
										[
											txt("1", { alignment: "center", fillColor: "#C0C0C0" }),
											txt("2", { alignment: "center", fillColor: "#C0C0C0" }),
											txt("3", { alignment: "center", fillColor: "#C0C0C0" }),
										],
										...data.rincian.map((item, idx): TableCell[] => [
											txt(toRoman(idx + 1), { alignment: "center" }),
											stk([
												txt(item.jenis_biaya_nama || "-", { bold: true }),
												txt(
													item.jenis_biaya_kode === "A"
														? item.jenis_transportasi || ""
														: item.jenis_biaya_kode === "B"
															? `${item.qty} hari x ${formatRupiah(Number(item.harga || 0))}`
															: item.jenis_biaya_kode === "C"
																? `${item.qty} malam x ${formatRupiah(Number(item.harga || 0))}`
																: "",
												),
											]),
											txt(formatRupiah(Number(item.qty) * Number(item.harga)), {
												alignment: "right",
											}),
										]),
										[
											"",
											txt("JUMLAH", {
												bold: true,
												alignment: "center",
												fillColor: "#C0C0C0",
											}),
											txt(formatRupiah(total), {
												bold: true,
												alignment: "right",
												fillColor: "#C0C0C0",
											}),
										],
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#aaa",
									vLineColor: () => "#aaa",
								},
								margin: [0, 0, 0, 20],
							},
						],
					},
				],
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},

			/* ================= TANDA TANGAN ================= */
			{
				columns: [
					{ width: "4%", text: "2." }, // kiri filler
					{
						width: "96%",
						stack: [
							{
								text: `Jumlah uang tersebut pada angka 1 diatas benar-benar dikeluarkan untuk pelaksanaan Perjalanan Dinas dimaksud dan apabila di kemudian hari terdapat kelebihan atas pembayaran, kami bersedia untuk menyetorkan kelebihan tersebut ke Kas Negara\n\nDemikian pernyataan ini kami buat dengan sebenarnya, untuk dipergunakan sebagaimana mestinya.`,
								margin: [0, 0, 0, 20],
							},
							{
								columns: [
									{
										width: "50%",
										stack: [
											txt("Mengetahui / Menyetujui"),
											txt(data.ppkom.jabatan, { bold: true }),
											txt("\n\n\n\n"),
											txt(data.ppkom.nama, { bold: true }),
											data.ppkom.nip ? txt(`NIP. ${data.ppkom.nip}`) : "",
										],
									},
									{
										width: "50%",
										stack: [
											txt(`Medan, ${data.tanggal}`),
											txt("Pelaksana SPD", { bold: true }),
											txt("\n\n\n\n"),
											txt(data.pegawai.nama, { bold: true }),
											data.pegawai.nip ? txt(`NIP. ${data.pegawai.nip}`) : "",
										],
									},
								],
							},
						],
					},
				],
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},
		],
	};
}
