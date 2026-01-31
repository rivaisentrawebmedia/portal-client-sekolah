import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";

export type PegawaiType = {
	pegawai_id: string;
	jabatan_kegiatan: string;
	urutan: number;
	nama: string;
	nip: string;
	tanggal_keberangkatan: string;
	tanggal_kepulangan: string;
};

export type SuratTugasBelakang = {
	tempat_kedudukan: string;
	tempat_tujuan: string;
	tanggal_pergi: string;
	tanggal_pulang: string;
	nama_pejabat: string;
	nip_pejabat: string;
	penandatang: string;
	jabatan_penandatanga: string;
	nip_penandatangan: string;
	list_pegawai: PegawaiType[];
};

export function generatePdfSuratTugasBelakang(
	data: SuratTugasBelakang,
): TDocumentDefinitions {
	const { tempat_kedudukan, tempat_tujuan, list_pegawai } = data;

	// ⚡ Loop pegawai, generate 1 halaman per pegawai
	const pages = list_pegawai.map((peg, index) => ({
		stack: [
			{
				table: {
					widths: ["50%", "50%"],
					body: [
						[
							{ text: "" }, // ✅ kolom 1: object kosong, tanpa border
							{
								stack: [
									{ text: `Berangkat Dari : ${tempat_kedudukan}` },
									{
										text: `(Tempat Kedudukan)`,
										italics: true,
										margin: [0, 0, 0, 5],
									},
									{
										table: {
											widths: ["30%", "70%"],
											body: [
												["Ke", `: ${tempat_tujuan}`],
												["Pada Tanggal", `: ${peg?.tanggal_keberangkatan}`],
											],
										},
										layout: "noBorders",
										margin: [0, 0, 0, 5],
									},
									{
										columns: [
											{ width: "33%", text: "" }, // kolom kosong di kiri (1/3)
											{
												width: "67%",
												stack: [
													{
														text: data?.jabatan_penandatanga,
														alignment: "left",
														bold: true,
													},
													{
														text: `\n\n\n\n${data?.penandatang}`,
														bold: true,
														alignment: "left",
													},

													data?.nip_penandatangan?.trim() !== ""
														? {
																text: `NIP. ${data?.nip_penandatangan}`,
																alignment: "left",
															}
														: {}, // atau false/null juga bisa
												],
											},
										],
										columnGap: 0, // opsional, default jarak antar kolom
										margin: [0, 0, 0, 0], // opsional, jarak atas
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							},
						],
					],
				},
				layout: {
					// Horizontal line: hanya di atas dan bawah
					hLineWidth: (i: any, node: any) =>
						i === 0 || i === node.table.body.length ? 0.5 : 0,
					// Vertikal line: hanya di sisi kiri kolom ke-2
					vLineWidth: (i: any) => (i === 1 ? 0.5 : 0),
				},
				margin: [0, 0, 0, 0],
			},
			{
				table: {
					widths: ["50%", "50%"],
					body: [
						[
							{
								stack: [
									{
										table: {
											widths: ["7%", "40%", "53%"], // total 100%
											body: [
												["I.", "Tiba di", ": " + data?.tempat_tujuan || ""],
												[
													"",
													"Pada Tanggal",
													": " + peg?.tanggal_kepulangan || "",
												],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `\nNIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							}, // ✅ kolom 1: object kosong, tanpa border
							{
								stack: [
									{
										table: {
											widths: ["30%", "70%"], // total 100%
											body: [
												["Berangkat dari", ": " + data?.tempat_tujuan || ""],
												["ke", ": " + data?.tempat_kedudukan || ""],
												["Pada Tanggal", ":"],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `NIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							},
						],
					],
				},
				layout: {
					// Horizontal line: hanya di atas dan bawah
					hLineWidth: (i: any, node: any) =>
						i === 0 || i === node.table.body.length ? 0.5 : 0,
					// Vertikal line: hanya di sisi kiri kolom ke-2
					vLineWidth: (i: any) => (i === 1 ? 0.5 : 0),
				},
				margin: [0, 0, 0, 0],
			},
			{
				table: {
					widths: ["50%", "50%"],
					body: [
						[
							{
								stack: [
									{
										table: {
											widths: ["7%", "40%", "53%"], // total 100%
											body: [
												["II.", "Tiba di", ":"],
												["", "Pada Tanggal", ":"],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `\nNIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							}, // ✅ kolom 1: object kosong, tanpa border
							{
								stack: [
									{
										table: {
											widths: ["30%", "70%"], // total 100%
											body: [
												["Berangkat dari", ":"],
												["ke", ":"],
												["Pada Tanggal", ":"],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `NIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							},
						],
					],
				},
				layout: {
					// Horizontal line: hanya di atas dan bawah
					hLineWidth: (i: any, node: any) =>
						i === 0 || i === node.table.body.length ? 0.5 : 0,
					// Vertikal line: hanya di sisi kiri kolom ke-2
					vLineWidth: (i: any) => (i === 1 ? 0.5 : 0),
				},
				margin: [0, 0, 0, 0],
			},
			{
				table: {
					widths: ["50%", "50%"],
					body: [
						[
							{
								stack: [
									{
										table: {
											widths: ["7%", "40%", "53%"], // total 100%
											body: [
												["III.", "Tiba di", ":"],
												["", "Pada Tanggal", ":"],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `\nNIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							}, // ✅ kolom 1: object kosong, tanpa border
							{
								stack: [
									{
										table: {
											widths: ["30%", "70%"], // total 100%
											body: [
												["Berangkat dari", ":"],
												["ke", ":"],
												["Pada Tanggal", ":"],
											],
											margin: [0, 0, 0, 20],
										},
										layout: "noBorders",
									},
									{
										text: `NIP. `,
										margin: [40, 40, 0, 0],
									},
								],
								margin: [0, 0, 0, 0],
								fontSize: 10,
							},
						],
					],
				},
				layout: {
					// Horizontal line: hanya di atas dan bawah
					hLineWidth: (i: any, node: any) =>
						i === 0 || i === node.table.body.length ? 0.5 : 0,
					// Vertikal line: hanya di sisi kiri kolom ke-2
					vLineWidth: (i: any) => (i === 1 ? 0.5 : 0),
				},
				margin: [0, 0, 0, 0],
			},
			{
				table: {
					widths: ["50%", "50%"],
					body: [
						[
							// 📌 Kolom Kiri
							{
								stack: [
									{
										table: {
											widths: ["7%", "93%"],
											body: [
												[
													"IV.",
													{
														stack: [
															{ text: `Tiba di : ${tempat_kedudukan}` },
															{
																text: `(Tempat Kedudukan)`,
																italics: true,
																margin: [0, 0, 0, 5],
															},
															{
																table: {
																	widths: ["30%", "70%"],
																	body: [["Pada Tanggal", `:`]],
																},
																layout: "noBorders",
																margin: [0, 0, 0, 5],
															},
															{
																columns: [
																	{ width: "33%", text: "" },
																	{
																		width: "67%",
																		stack: [
																			{
																				text: data?.jabatan_penandatanga,
																				bold: true,
																				alignment: "left",
																			},
																			{
																				text: `\n\n\n\n${data?.penandatang}`,
																				bold: true,
																				alignment: "left",
																			},
																			data?.nip_penandatangan?.trim() !== ""
																				? {
																						text: `NIP. ${data?.nip_penandatangan}`,
																						alignment: "left",
																					}
																				: {}, // atau false/null juga bisa
																		],
																	},
																],
																columnGap: 0,
																margin: [0, 20, 0, 0],
															},
														],
													},
												],
											],
										},
										layout: "noBorders",
										margin: [0, 0, 0, 20],
									},
								],
								fontSize: 10,
							},

							// 📌 Kolom Kanan
							{
								stack: [
									{
										text: `Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.`,
									},
									{
										columns: [
											{ width: "33%", text: "" },
											{
												width: "67%",
												stack: [
													{
														text: data?.jabatan_penandatanga,
														bold: true,
														alignment: "left",
													},
													{
														text: `\n\n\n\n${data?.penandatang}`,
														bold: true,
														alignment: "left",
													},
													data?.nip_penandatangan?.trim() !== ""
														? {
																text: `NIP. ${data?.nip_penandatangan}`,
																alignment: "left",
															}
														: {}, // atau false/null juga bisa
												],
											},
										],
										columnGap: 0,
										margin: [0, 20, 0, 0],
									},
								],
								fontSize: 10,
							},
						],
					],
				},
				layout: {
					// Horizontal line: hanya di atas dan bawah
					hLineWidth: (i: any, node: any) =>
						i === 0 || i === node.table.body.length ? 0.5 : 0,
					// Vertikal line: hanya di sisi kiri kolom ke-2
					vLineWidth: (i: any) => (i === 1 ? 0.5 : 0),
				},
				margin: [0, 0, 0, 0],
			},
			{
				table: {
					widths: ["50%", "50%"], // ✅ syntax fix: harus '50%', '50%'
					body: [
						[
							{
								stack: [
									{
										table: {
											widths: ["7%", "93%"],
											body: [["V.", "Catatan Lain-lain"]],
										},
										layout: "noBorders",
										margin: [0, 0, 0, 0],
									},
								],
							},
							{ text: "" }, // ✅ cell kolom ke-2: harus ada walau kosong
						],
					],
				},
				layout: {
					// ✅ Border hanya atas & bawah
					hLineWidth: (i: any, node: any) => {
						if (i === 0 || i === node.table.body.length) {
							return 0.5; // border atas & bawah
						}
						return 0;
					},
					vLineWidth: () => 0, // no vertical border
				},
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},
			{
				table: {
					widths: ["4.5%", "95.5%"],
					body: [
						[
							{ text: "VI." }, // kolom penomoran
							{
								stack: [
									{ text: "Perhatian", bold: true, margin: [0, 0, 0, 5] },
									{
										text: `Pejabat yang menerbitkan SPP, Pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/tiba, serta Bendahara Pengeluaran bertanggung jawab berdasarkan peraturan-peraturan keuangan negara apabila negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.`,
									},
								],
							},
						],
					],
				},
				layout: "noBorders", // ✅ border semua dimatikan
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},
		],
		...(index > 0 ? { pageBreak: "before" } : {}),
	}));

	return {
		content: pages as Content,
		pageMargins: [40, 40, 40, 40],
	};
}
