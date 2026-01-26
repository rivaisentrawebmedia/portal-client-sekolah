import { z } from "zod";

export const FilterDashboardSchema = z.object({
	tanggal: z.string().optional().nullable().nullish(),
});

export type FilterDashboardFormValues = z.infer<typeof FilterDashboardSchema>;
