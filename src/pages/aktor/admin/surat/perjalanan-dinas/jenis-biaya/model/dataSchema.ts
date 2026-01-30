import { z } from "zod";

export const JenisBiayaSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	kode: z.string().min(1, "Kode is required"),
});

export type JenisBiayaFormValues = z.infer<typeof JenisBiayaSchema>;
