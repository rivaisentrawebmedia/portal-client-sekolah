import { z } from "zod";

export const PeriodeCutiSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	kode: z.string().min(1, "Kode is required"),
	mulai: z.string().min(1, "Mulai is required"),
	akhir: z.string().min(1, "Akhir is required"),
});

export type PeriodeCutiFormValues = z.infer<typeof PeriodeCutiSchema>;
