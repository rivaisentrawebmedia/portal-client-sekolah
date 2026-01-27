import { z } from "zod";

export const FilterRekapVisitSchema = z.object({
	tahun: z.string().optional(),
});
