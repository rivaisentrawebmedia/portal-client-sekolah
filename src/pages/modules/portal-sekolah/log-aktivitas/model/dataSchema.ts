import { z } from "zod";

export const LogAktivitasSchema = z.object({
	jangka_waktu: z.string().optional().nullable().nullish(),
	modul_id: z.string().optional().nullable().nullish(),
	user_id: z.array(z.string().optional().nullable().nullish()).optional(),
});

export type LogAktivitasFormValues = z.infer<typeof LogAktivitasSchema>;
