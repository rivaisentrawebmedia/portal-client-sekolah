import { z } from "zod";

export const SPPDSchema = z.object({
	bagian_surat_id: z.string().min(1, "Bagian surat is required"),
	jabatan_penandatangan_id: z
		.string()
		.min(1, "Jabatan penandatangan is required"),
	penandatangan_id: z.string().min(1, "Penandatangan is required"),
	jenis_transportasi_id: z.string().min(1, "Jenis transportasi is required"),
	tanggal_surat: z.string().min(1, "Tanggal is required"),

	tempat_asal: z.string().min(1, "Tempat asal is required"),
	tempat_tujuan: z.string().min(1, "Tempat tujuan is required"),
	instansi: z.string().min(1, "Instansi is required"),
	akun: z.string().min(1, "Akun is required"),
	lain_lain: z.string().min(1, "Lain lain is required"),

	maksud_kegiatan: z.string().min(1, "Maksud kegiatan is required"),

	no_surat: z.string().optional().nullable().nullish(),
	kode_depan: z.string().optional().nullable().nullish(),
	kode_belakang: z.string().optional().nullable().nullish(),
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type SPPDFormValues = z.infer<typeof SPPDSchema>;

export const EdtSPPDSchema = z.object({
	bagian_surat_id: z.string().min(1, "Bagian surat is required"),
	jabatan_penandatangan_id: z
		.string()
		.min(1, "Jabatan penandatangan is required"),
	penandatangan_id: z.string().min(1, "Penandatangan is required"),
	jenis_transportasi_id: z.string().min(1, "Jenis transportasi is required"),
	tanggal_surat: z.string().min(1, "Tanggal is required"),
	tempat_asal: z.string().min(1, "Tempat asal is required"),
	tempat_tujuan: z.string().min(1, "Tempat tujuan is required"),
	instansi: z.string().min(1, "Instansi is required"),
	akun: z.string().min(1, "Akun is required"),
	lain_lain: z.string().min(1, "Lain lain is required"),
	maksud_kegiatan: z.string().min(1, "Maksud Kegiatan is required"),

	list_pegawai: z
		.array(
			z.object({
				pegawai_id: z.string().optional(),
				no_sppd: z.string().optional(),
				tanggal_keberangkatan: z.string().optional(),
				tanggal_kepulangan: z.string().optional(),
			}),
		)
		.min(1, "List pegawai is required"),

	nomor_surat: z.string().optional().nullable().nullish(),
	kode_depan: z.string().optional().nullable().nullish(),
	kode_belakang: z.string().optional().nullable().nullish(),
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type EdiSPPDFormValues = z.infer<typeof EdtSPPDSchema>;
