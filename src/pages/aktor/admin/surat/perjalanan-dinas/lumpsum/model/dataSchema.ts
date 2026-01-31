import { z } from "zod";

export const LumpsumSPPDSchema = z.object({
	pejabat_id: z.string().min(1, "Pejabat is required"),
	jabatan_pejabat_id: z.string().min(1, "Jabatan pejabat is required"),
	bendahara_id: z.string().min(1, "Bendahara is required"),
	sumber_dana_id: z.string().min(1, "Sumber biaya is required"),
	jabatan_bendahara_id: z.string().min(1, "Jabatan bendahara is required"),
	items: z
		.array(
			z.object({
				jenis_biaya_id: z.string().optional(),
				jenis_transportasi_id: z.string().optional(),
				no_tiket: z.string().optional(),
				harga: z.number().optional(),
				qty: z.string().optional(),
				redaksi: z.string().optional(),
				ril: z.boolean().optional(),
			}),
		)
		.min(1, "Item lumpsum is required"),
});

export type LumpsumSPPDFormValues = z.infer<typeof LumpsumSPPDSchema>;
