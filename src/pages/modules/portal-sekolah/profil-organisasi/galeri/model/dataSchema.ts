import { z } from "zod";

export const GaleriSchema = z.object({
	gambar: z.string().min(1, "Gambar is required"),
});

export type GaleriFormValues = z.infer<typeof GaleriSchema>;
