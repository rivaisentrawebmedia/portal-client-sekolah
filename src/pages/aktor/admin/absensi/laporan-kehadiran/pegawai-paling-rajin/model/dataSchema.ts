import { z } from "zod";

export const FilterPegawaiPalingRajinSchema = z.object({
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type FilterPegawaiPalingRajinFormValues = z.infer<
	typeof FilterPegawaiPalingRajinSchema
>;
