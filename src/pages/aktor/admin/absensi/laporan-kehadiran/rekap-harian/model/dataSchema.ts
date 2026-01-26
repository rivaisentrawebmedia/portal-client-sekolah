import { z } from "zod";

export const FilterRekapHarianSchema = z.object({
	tanggal: z.string().optional().nullable().nullish(),
	status: z.string().optional().nullable().nullish(),
});

export type FilterRekapHarianFormValues = z.infer<
	typeof FilterRekapHarianSchema
>;
