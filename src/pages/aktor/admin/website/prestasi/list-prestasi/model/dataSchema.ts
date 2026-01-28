import { z } from "zod";

export const PrestasiSchema = z.object({
	judul: z.string().min(1, "Judul is required"),
	tanggal: z.string().min(1, "Tanggal is required"),
	kategori_prestasi_id: z.string().min(1, "Kategori prestasi is required"),
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

export type PrestasiFormValues = z.infer<typeof PrestasiSchema>;
