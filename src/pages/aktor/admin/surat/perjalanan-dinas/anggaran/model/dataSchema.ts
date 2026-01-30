import { z } from "zod";

export const AnggaranSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	tahun: z.string().min(1, "Tahun is required"),
	jumlah: z.number().min(1, "Jumlah is required"),
});

export type AnggaranFormValues = z.infer<typeof AnggaranSchema>;
