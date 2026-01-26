import { z } from "zod";

export const KegiatanHarianSchema = z.object({
	hari: z.string().optional().nullable().nullish(),
	pegawai_id: z.string().optional().nullable().nullish(),
	tanggal: z.string().min(1, "Tanggal is required"),
	jam_masuk: z.string().min(1, "Jam masuk is required"),
	jam_keluar: z.string().min(1, "Jam keluar is required"),
	pekerjaan: z.string().min(1, "Pekerjaan is required"),
	status: z.string().min(1, "Status is required"),
	valid: z.boolean(),
	lampiran_gambar: z
		.array(
			z.object({
				id: z.string().optional().nullable().nullish(),
				label: z.string().optional().nullable().nullish(),
			}),
		)
		.optional()
		.nullable()
		.nullish(),
	lampiran_dokumen: z
		.array(
			z.object({
				id: z.string().optional().nullable().nullish(),
				label: z.string().optional().nullable().nullish(),
			}),
		)
		.optional()
		.nullable()
		.nullish(),
});

export type KegiatanHarianFormValues = z.infer<typeof KegiatanHarianSchema>;

export const FilterKegiatanHarianSchema = z.object({
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type FilterKegiatanHarianFormValues = z.infer<
	typeof FilterKegiatanHarianSchema
>;
