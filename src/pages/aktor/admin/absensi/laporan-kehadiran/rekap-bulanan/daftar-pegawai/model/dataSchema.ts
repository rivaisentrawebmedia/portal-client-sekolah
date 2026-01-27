import { z } from "zod";

export const FilterRekapBulananSchema = z.object({
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type FilterRekapBulananFormValues = z.infer<
	typeof FilterRekapBulananSchema
>;
