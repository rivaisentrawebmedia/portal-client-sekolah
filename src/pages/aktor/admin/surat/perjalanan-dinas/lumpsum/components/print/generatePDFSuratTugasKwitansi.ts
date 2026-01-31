import dayjs from "dayjs";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import type { ItemsLumpsum } from "../../model";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { formatRupiah, numberToTerbilang } from "@/utils/helpers";

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

export type DataKwitansi = {
	kop_surat: KopSurat;

	pegawai: {
		nama: string;
		nip: string;
	};
	ppkom: {
		nama: string;
		nip: string;
		jabatan: string;
	};

	bendahara: {
		nama: string;
		nip: string;
	};
	no_surat: string;
	tgl_surat: string;
	tgl_mulai: string;
	tgl_selesai: string;
	tanggal: string;
	rincian: ItemsLumpsum[];
	nama_desa: string;
};

export function generatePdfSuratTugasKwitasi(
	data: DataKwitansi,
): TDocumentDefinitions {
	const { kop_surat } = data;

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

			{
				columns: [
					{
						width: "100%",
						table: {
							widths: ["100%"],
							body: [
								[
									{
										stack: [
											{
												text: "SURAT PERINTAH BAYAR",
												fontSize: 13,
												bold: true,
												alignment: "center",
											},
											{
												columns: [
													{ width: "50%", text: "" },
													{
														width: "50%",
														table: {
															widths: ["30%", "70%"],
															body: [
																[{ text: "Tanggal", bold: true }, ":"],
																[{ text: "Nomor", bold: true }, ":"],
															],
														},
														layout: "noBorders",
													},
												],
												margin: [0, 10, 0, 10],
											},
										],
									},
								],

								[
									{
										text: `Saya yang bertanda tangan di bawah ini selaku Pejabat Pembuat Komitmen memerintahkan Bendahara Pengeluaran Agar Melakukan Pembayaran sejumlah: Rp. ${formatRupiah(
											data?.rincian?.reduce(
												(acc, cur) =>
													acc + Number(cur?.qty) * Number(cur?.harga),
												0,
											) ?? 0,
										)}`,
										margin: [0, 10, 0, 10],
									},
								],

								[
									{
										text:
											numberToTerbilang(
												data?.rincian?.reduce(
													(acc, cur) =>
														acc + Number(cur?.qty) * Number(cur?.harga),
													0,
												) ?? 0,
											) || "",
										margin: [0, 10, 0, 10],
									},
								],

								[
									{
										stack: [
											{
												table: {
													widths: ["30%", "*"],
													body: [
														["Kepada", `: ${data?.pegawai?.nama ?? ""}`],
														[
															"Untuk Pembayaran",
															`: Pembayaran Biaya Perjalanan Dinas pada tanggal ${data?.tgl_mulai} s.d ${data?.tgl_selesai} dengan Nomor Surat Tugas : ${data?.no_surat}`,
														],
													],
												},
												layout: "noBorders",
												margin: [0, 10, 0, 10],
											},
											{
												text:
													"Atas Dasar:\n" +
													"1. Kuitansi/ Bukti Pembelian\n" +
													"2. Nota/ Bukti Penerimaan Barang/ Jasa (Bukti Lainnya)",
											},
											{
												table: {
													widths: ["30%", "*"],
													body: [
														["Dibebankan pada", ":"],
														["Kegiatan/ Output/ MAK", ":"],
														["Kode", ":"],
													],
												},
												layout: "noBorders",
												margin: [0, 10, 0, 10],
											},
										],
									},
								],

								[
									{
										columns: [
											{
												width: "*",
												stack: [
													{ text: "Lunas dibayar,\nTanggal," },
													{ text: "\nBendahara", bold: true },
													{
														text: `\n\n\n\n${data?.bendahara?.nama ?? ""}`,
														bold: true,
													},
													data?.bendahara?.nip?.trim()
														? { text: `NIP. ${data.bendahara.nip}` }
														: "",
												],
											},
											{
												width: "*",
												stack: [
													{
														text: `Diterima,\nTanggal,........${dayjs()
															.locale("id")
															.format("MMMM YYYY")}`,
													},
													{ text: "\nPenerima Uang", bold: true },
													{
														text: `\n\n\n\n${data?.pegawai?.nama ?? ""}`,
														bold: true,
													},
													data?.pegawai?.nip?.trim()
														? { text: `NIP. ${data.pegawai.nip}` }
														: "",
												],
											},
											{
												width: "*",
												stack: [
													{
														text: `${data?.nama_desa ?? ""},........${dayjs()
															.locale("id")
															.format("MMMM YYYY")}\n\n`,
													},
													{
														text: `\n${data?.ppkom?.jabatan ?? ""}`,
														bold: true,
													},
													{
														text: `\n\n\n\n${data?.ppkom?.nama ?? ""}`,
														bold: true,
													},
													data?.ppkom?.nip?.trim()
														? { text: `NIP. ${data.ppkom.nip}` }
														: "",
												],
											},
										],
										margin: [0, 10, 0, 10],
									},
								],
							],
						},
						fontSize: 10,
						layout: {
							hLineWidth: () => 0.5,
							vLineWidth: () => 0.5,
						},
						margin: [0, 0, 0, 10],
					},
				],
			},
		],
	};
}
