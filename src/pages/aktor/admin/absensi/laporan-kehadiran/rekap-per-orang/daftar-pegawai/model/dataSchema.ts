import { z } from "zod";

export const FilterRekapPerOrangSchema = z.object({
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type FilterRekapPerOrangFormValues = z.infer<
	typeof FilterRekapPerOrangSchema
>;
