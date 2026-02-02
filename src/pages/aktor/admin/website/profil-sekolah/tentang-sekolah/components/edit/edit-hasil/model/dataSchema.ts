import { z } from "zod";

export const HasilSekolahSchema = z.object({
	gambar: z.string().optional().nullable().nullish(),
	isi: z.string().optional(),
	items: z.array(z.string()).min(1, "Kode is required"),
});

export type HasilSekolahFormValues = z.infer<typeof HasilSekolahSchema>;
