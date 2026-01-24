import { z } from "zod";

export const KelompokSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
});

export type KelompokFormValues = z.infer<typeof KelompokSchema>;
