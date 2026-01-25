import { z } from "zod";

export const MonitoringKehadiranSchema = z.object({
	tanggal: z.string().optional().nullable().nullish(),
	status: z.string().optional().nullable().nullish(),
});

export type MonitoringKehadiranFormValues = z.infer<
	typeof MonitoringKehadiranSchema
>;
