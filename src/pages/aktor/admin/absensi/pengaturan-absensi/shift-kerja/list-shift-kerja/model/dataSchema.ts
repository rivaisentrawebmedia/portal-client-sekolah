import { z } from "zod";

export const ShiftKerjaSchema = z.object({
	pegawai_id: z.array(z.string()).optional(),

	nama: z.string().min(1, "Nama is required"),

	is_wajib_foto: z.boolean().refine((v) => v === true, {
		message: "Wajib foto harus diaktifkan",
	}),

	is_wajib_realisasi_kegiatan: z.boolean(),

	is_wajib_isi_rencana_kegiatan: z.boolean(),

	is_wajib_presensi_di_lokasi: z.boolean(),

	jam_kerja: z
		.array(
			z.object({
				hari: z.string().min(1, "Hari is required"),

				jam_masuk: z.string().optional().nullable().nullish(),
				jam_mulai_absen_masuk: z.string().optional().nullable().nullish(),
				jam_akhir_absen_masuk: z.string().optional().nullable().nullish(),
				toleransi_keterlambatan: z.string().optional().nullable().nullish(),

				jam_pulang: z.string().optional().nullable().nullish(),
				jam_mulai_absen_pulang: z.string().optional().nullable().nullish(),
				jam_akhir_absen_pulang: z.string().optional().nullable().nullish(),
				toleransi_pulang_cepat: z.string().optional().nullable().nullish(),
				is_libur: z.boolean().optional().nullable().nullish(),
			}),
		)
		.min(1, "Jam kerja is required"),
});

export type ShiftKerjaFormValues = z.infer<typeof ShiftKerjaSchema>;
