import { z } from "zod";

export const MonitoringCutiSchema = z.object({
	periode_cuti_id: z.string().optional().nullable().nullish(),
	status: z.string().optional().nullable().nullish(),
});

export type MonitoringCutiFormValues = z.infer<typeof MonitoringCutiSchema>;
