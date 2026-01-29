import { z } from "zod";

export const KopSuratSchema = z.object({
	logo: z.string().optional().nullable().nullish(),

	isi_1: z.string().optional().nullable().nullish(),
	jenis_font_1: z.string().optional().nullable().nullish(),
	gaya_font_1: z.string().optional().nullable().nullish(),
	ukuran_font_1: z.string().optional().nullable().nullish(),

	isi_2: z.string().optional().nullable().nullish(),
	jenis_font_2: z.string().optional().nullable().nullish(),
	gaya_font_2: z.string().optional().nullable().nullish(),
	ukuran_font_2: z.string().optional().nullable().nullish(),

	isi_3: z.string().optional().nullable().nullish(),
	jenis_font_3: z.string().optional().nullable().nullish(),
	gaya_font_3: z.string().optional().nullable().nullish(),
	ukuran_font_3: z.string().optional().nullable().nullish(),

	isi_4: z.string().optional().nullable().nullish(),
	jenis_font_4: z.string().optional().nullable().nullish(),
	gaya_font_4: z.string().optional().nullable().nullish(),
	ukuran_font_4: z.string().optional().nullable().nullish(),

	isi_5: z.string().optional().nullable().nullish(),
	jenis_font_5: z.string().optional().nullable().nullish(),
	gaya_font_5: z.string().optional().nullable().nullish(),
	ukuran_font_5: z.string().optional().nullable().nullish(),

	isi_6: z.string().optional().nullable().nullish(),
	jenis_font_6: z.string().optional().nullable().nullish(),
	gaya_font_6: z.string().optional().nullable().nullish(),
	ukuran_font_6: z.string().optional().nullable().nullish(),
});

export type KopSuratFormValues = z.infer<typeof KopSuratSchema>;
