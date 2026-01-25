import { z } from "zod";

export const JamMasukSchema = z.object({
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
});

export type JamMasukFormValues = z.infer<typeof JamMasukSchema>;
