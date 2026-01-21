import { z } from "zod";

export const VisiMisiSchema = z.object({
	visi: z.string().min(1, "Visi is required"),
	misi: z.string().min(1, "Misi is required"),
	tujuan: z.string().min(1, "Tujuan is required"),
});

export type VisiMisiFormValues = z.infer<typeof VisiMisiSchema>;
