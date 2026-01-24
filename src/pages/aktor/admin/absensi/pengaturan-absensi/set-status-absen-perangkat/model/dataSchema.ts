import { z } from "zod";

export const StatusAbsenSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	kode: z.string().min(1, "Kode is required"),
	mulai: z.string().min(1, "Mulai is required"),
	akhir: z.string().min(1, "Akhir is required"),
});

export type StatusAbsenFormValues = z.infer<typeof StatusAbsenSchema>;
