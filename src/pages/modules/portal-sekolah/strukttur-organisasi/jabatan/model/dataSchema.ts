import { z } from "zod";

export const JabatanSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	kelompok_jabatan_id: z.string().min(1, "Kelompok jabatan is required"),

	is_utama: z
		.boolean()
		.optional()
		.refine((v) => v !== undefined, {
			message: "Apakah utama iss required",
		}),

	is_mapel: z
		.boolean()
		.optional()
		.refine((v) => v !== undefined, {
			message: "Apakah mata pelajaran is required",
		}),

	is_walas: z
		.boolean()
		.optional()
		.refine((v) => v !== undefined, {
			message: "Apakah wali kelas is required",
		}),

	pejabat_id: z.string().min(1, "Pejabat is required"),
	mulai: z.string().min(1, "Mulai is required"),
	selesai: z.string().min(1, "Selesai is required"),
});

export type JabatanFormValues = z.infer<typeof JabatanSchema>;

export const GantiPejabatSchema = z.object({
	nama: z.string().optional(),
	kelompok_jabatan_id: z.string().optional(),

	pejabat_id: z.string().min(1, "Pejabat is required"),
	mulai: z.string().min(1, "Mulai is required"),
	selesai: z.string().min(1, "Selesai is required"),
});

export type GantiPejabatFormValues = z.infer<typeof GantiPejabatSchema>;
