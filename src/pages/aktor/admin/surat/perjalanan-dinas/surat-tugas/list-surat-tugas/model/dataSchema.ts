import { z } from "zod";

export const SuratTugasSchema = z.object({
	bagian_surat_id: z.string().min(1, "Kegiatan surat is required"),
	nomor_surat: z.string().optional().nullable().nullish(),
	tanggal_surat: z.string().min(1, "Tanggal surat is required"),
	tanggal_mulai: z.string().min(1, "Tanggal mulai is required"),
	tanggal_selesai: z.string().min(1, "Tanggal selesai is required"),
	tempat_kegiatan: z.string().min(1, "Tempat kegiatan is required"),
	penandatangan_id: z.string().min(1, "Penandatangan is required"),
	jabatan_penandatangan_id: z
		.string()
		.min(1, "Jabatan penandatangan is required"),
	list_pegawai: z
		.array(
			z.object({
				pegawai_id: z.string().optional().nullable().nullish(),
				jabatan_kegiatan: z.string().optional().nullable().nullish(),
				nama: z.string().optional().nullable().nullish(),
				nip: z.string().optional().nullable().nullish(),
			}),
		)
		.min(1, "Pegawai is required"),
	dasar_surat_tugas: z
		.array(z.string())
		.min(1, "Dasar surat tugas is required"),

	kegiatan: z.array(z.string()).min(1, "Kegiatan is required"),

	kode_depan: z.string().optional().nullable().nullish(),
	kode_belakang: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
	tahun: z.string().optional().nullable().nullish(),
});

export type SuratTugasFormValues = z.infer<typeof SuratTugasSchema>;
