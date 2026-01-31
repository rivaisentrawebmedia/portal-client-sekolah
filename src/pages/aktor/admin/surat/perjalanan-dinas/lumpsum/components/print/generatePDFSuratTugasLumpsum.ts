import type {
	Content,
	ContentStack,
	ContentText,
	TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { KopSurat } from "../../../../pengaturan/kop-surat/kop-sekolah/model";
import type { ItemsLumpsum } from "../../model";
import { formatRupiah, numberToTerbilang, toRoman } from "@/utils/helpers";
import dayjs from "dayjs";

export type SuratTugasLumpsum = {
	kop_surat: KopSurat;
	lampiran_spd_nomor: string;
	tanggal: string;
	kabupaten: string;
	rincian: ItemsLumpsum[];
	bendahara: {
		nama: string;
		nip: string;
	};
	penerima: {
		nama: string;
		nip: string;
	};
	ppkom: {
		nama: string;
		nip: string;
		jabatan: string;
	};
	nama_jabatan_utama: string;
};

const txt = (text: string, options?: Partial<ContentText>): ContentText => ({
	text,
	...options,
});

const stk = (stack: Content[]): ContentStack => ({
	stack,
});

export function generatePdfSuratTugasLumpsum(
	data: SuratTugasLumpsum,
): TDocumentDefinitions {
	const total = data.rincian.reduce(
		(acc, cur) => acc + Number(cur.harga || 0),
		0,
	);

	return {
		defaultStyle: { fontSize: 10 },

		content: [
			/* ================= KOP SURAT ================= */
			{
				table: {
					widths: ["50%", "20%", "30%"],
					body: [
						[
							stk([
								txt(data.kop_surat.isi_1?.toUpperCase() || ""),
								txt(data.kop_surat.isi_2?.toUpperCase() || ""),
							]),
							"",
							stk([txt("No. Pembukuan:"), txt("\nMAK")]),
						],
					],
				},
				layout: "noBorders",
				margin: [0, 0, 0, 20],
			},

			/* ================= JUDUL ================= */
			txt("RINCIAN PERJALANAN DINAS\n", {
				alignment: "center",
				bold: true,
				fontSize: 12,
				margin: [0, 0, 0, 20],
			}),

			/* ================= INFO ================= */
			{
				table: {
					widths: ["30%", "70%"],
					body: [
						["Lampiran SPD Nomor", `: ${data.lampiran_spd_nomor}`],
						["Tanggal", `: ${data.tanggal}`],
					],
				},
				layout: "noBorders",
				margin: [0, 0, 0, 20],
			},

			/* ================= HEADER TABLE ================= */
			{
				table: {
					widths: ["5%", "60%", "15%", "20%"],
					body: [
						[
							txt("No", { bold: true, alignment: "center" }),
							txt("Perincian", { bold: true, alignment: "center" }),
							txt("Jumlah", { bold: true, alignment: "center" }),
							txt("Keterangan", { bold: true, alignment: "center" }),
						],
						[
							txt("1", { alignment: "center" }),
							txt("2", { alignment: "center" }),
							txt("3", { alignment: "center" }),
							txt("4", { alignment: "center" }),
						],
					],
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
				},
			},

			/* ================= ISI TABLE ================= */
			{
				table: {
					widths: ["5%", "60%", "15%", "20%"],
					body: data.rincian.map((item, idx) => {
						const detailText =
							item.jenis_biaya_kode === "A"
								? item?.jenis_transportasi || ""
								: item?.jenis_biaya_kode === "B"
									? `${item.qty} hari x ${formatRupiah(
											Math.round(Number(item.harga) / Number(item.qty || 1)),
										)}`
									: item?.jenis_biaya_kode === "C"
										? `${item?.qty} malam x ${formatRupiah(
												Math.round(Number(item.harga) / Number(item.qty || 1)),
											)}`
										: "";

						return [
							{
								text: toRoman(idx + 1),
								alignment: "center",
							},
							{
								stack: [
									{
										text: item.jenis_biaya_nama || "-",
										bold: true,
									},
									{
										text: detailText,
										margin: [0, 2, 0, 0],
									},
								],
							},
							{
								text: `Rp. ${formatRupiah(Number(item.harga) || 0)}`,
								alignment: "right",
							},
							{
								text: "",
							},
						];
					}),
				},
				margin: [0, 0, 0, 0],
				layout: {
					hLineWidth: () => 0,
					vLineWidth: () => 0.5,
				},
				fontSize: 10,
			},

			/* ================= TOTAL ================= */
			{
				table: {
					widths: ["5%", "60%", "15%", "20%"],
					body: [
						[
							"",
							txt(
								`JUMLAH (${data.rincian
									.map((_, i) => toRoman(i + 1))
									.join("+")})`,
								{ bold: true, alignment: "center" },
							),
							txt(formatRupiah(total), {
								bold: true,
								alignment: "right",
							}),
							"",
						],
					],
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
				},
			},

			/* ================= TERBILANG ================= */
			{
				table: {
					widths: ["100%"],
					body: [
						[txt(`Terbilang : ${numberToTerbilang(total)}`, { bold: true })],
					],
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
				},
				margin: [0, 0, 0, 20],
			},

			{
				columns: [
					{
						width: "60%",
						stack: [
							{ text: "" },
							{ text: "\nTelah dibayarkan sejumlah", margin: [0, 0, 0, 0] },
							{
								text: `Rp. ${formatRupiah(
									data?.rincian?.reduce(
										(acc, cur) => acc + (parseFloat(String(cur.harga)) || 0),
										0,
									) || 0,
								)}`,
								bold: true,
							},
							{
								text: "\n\nBendahara\n\n\n\n",
								bold: true,
							},
							{ text: data?.bendahara?.nama || "", bold: true },
							data?.bendahara?.nip?.trim()
								? {
										text: `NIP. ${data.bendahara.nip}`,
										alignment: "left",
									}
								: "",
						],
					},
					{
						width: "40%",
						stack: [
							{ text: `Medan, ${data?.tanggal || ""}` },
							{
								text: "Telah Menerima jumlah uang sebesar",
							},
							{
								text: `Rp. ${formatRupiah(
									data?.rincian?.reduce(
										(acc, cur) => acc + Number(cur.harga),
										0,
									) || 0,
								)}`,
								bold: true,
							},
							{
								text: "\n\nYang Menerima\n\n\n\n",
								bold: true,
							},
							{ text: data?.penerima?.nama || "", bold: true },
							data?.penerima?.nip?.trim()
								? {
										text: `NIP. ${data.penerima.nip}`,
										alignment: "left",
									}
								: "",
						],
					},
				],
			},

			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 20, 0, 20],
			},

			{
				text: "PERHITUNGAN SPD RAMPUNG",
				bold: true,
				fontSize: 11,
				alignment: "center",
			},

			{
				columns: [
					{ width: "*", text: "" }, // kiri filler
					{
						width: "70%",
						table: {
							widths: ["75%", "25%"], // total 100% dalam table
							body: [
								[
									"Ditetapkan Sejumlah",
									{
										text: `Rp. ${formatRupiah(
											data.rincian.reduce(
												(acc, cur) => acc + Number(cur.harga),
												0,
											),
										)}`,
										bold: true,
									},
								],
								[
									"Yang telah dibayarkan semula",
									{
										text: `Rp. ${formatRupiah(
											data.rincian.reduce(
												(acc, cur) => acc + Number(cur.harga),
												0,
											),
										)}`,
										bold: true,
									},
								],
								[
									"Sisa Kurang/ lebih",
									{
										text: `Rp. ${formatRupiah(0)}`,
										bold: true,
									},
								],
							],
						},
						layout: "noBorders",
						margin: [0, 0, 0, 20],
					},
					{ width: "*", text: "" }, // kanan filler
				],
			},

			{
				columns: [
					{
						width: "*",
						text: "",
					},
					{
						width: "40%",
						stack: [
							{
								table: {
									widths: ["35%", "*"],
									body: [
										[
											{ text: "Dikeluarkan di", fontSize: 10 },
											{ text: `: ${data?.kabupaten}`, fontSize: 10 },
										],
										[
											{ text: "Pada Tanggal", fontSize: 10 },
											{
												text: `: ${dayjs(data?.tanggal)
													.locale("id")
													.format("DD MMMM YYYY")}`,
												fontSize: 10,
											},
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
								text: data?.ppkom?.jabatan || "",
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 50],
							},
							{
								text: data?.ppkom?.nama || "",
								bold: true,
								fontSize: 10,
							},
							data?.ppkom?.nip?.trim()
								? {
										text: `NIP. ${data.ppkom.nip}`,
										alignment: "left",
									}
								: "",
						],
						alignment: "left",
					},
				],
				columnGap: 0,
			},
		],
	};
}
