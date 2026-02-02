import { z } from "zod";

export const TujuanSekolahSchema = z.object({
	gambar: z.string().optional().nullable().nullish(),
	isi: z.string().optional(),
	items: z.array(z.string()).min(1, "Kode is required"),
});

export type TujuanSekolahFormValues = z.infer<typeof TujuanSekolahSchema>;
