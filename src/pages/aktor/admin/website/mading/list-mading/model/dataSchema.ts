import { z } from "zod";

export const MadingSchema = z.object({
	judul: z.string().min(1, "Judul is required"),
	tanggal: z.string().min(1, "Tanggal is required"),
	kategori_mading_id: z.string().min(1, "Kategori mading is required"),
	isi: z.string().min(1, "Isi is required"),
	gambar: z
		.array(
			z
				.object({
					id: z.string().optional().nullable().nullish(),
					label: z.string().optional().nullable().nullish(),
				})
				.optional()
				.nullable()
				.nullish(),
		)
		.optional()
		.nullable()
		.nullish(),
	tag: z
		.array(z.string().optional().nullable().nullish())
		.optional()
		.nullable()
		.nullish(),
	status: z.string().min(1, "Status is required"),
});

export type MadingFormValues = z.infer<typeof MadingSchema>;
