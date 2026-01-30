import { z } from "zod";

export const LumpsumSPPDSchema = z.object({
	pejabat_id: z.string().min(1, "Pejabat is required"),
	jabatan_pejabat_id: z.string().min(1, "Jabatan pejabat is required"),
	bendahara_id: z.string().min(1, "Bendahara is required"),
	jabatan_bendahara_id: z.string().min(1, "Jabatan bendahara is required"),
	items: z
		.array(
			z.object({
				jenis_biaya_id: z.string(),
				jenis_transportasi_id: z.string(),
				no_tiket: z.string(),
				harga: z.string(),
				qty: z.number(),
				redaksi: z.string(),
				ril: z.boolean(),
			}),
		)
		.min(1, "Item lumpsum is required"),
});

export type LumpsumSPPDFormValues = z.infer<typeof LumpsumSPPDSchema>;
