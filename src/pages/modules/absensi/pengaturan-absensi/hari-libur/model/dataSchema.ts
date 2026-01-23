import { z } from "zod";

export const HariLiburSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	tanggal_mulai: z.string().min(1, "Tanggal mulai is required"),
	tanggal_akhir: z.string().optional().nullable().nullish(),
	is_lebih_sehari: z.boolean().optional().nullable().nullish(),
});

export type HariLiburFormValues = z.infer<typeof HariLiburSchema>;
