import { z } from "zod";

export const PengaturanAbsensiSchema = z.object({
	is_wajib_foto: z.boolean(),
	is_wajib_realisasi_kegiatan: z.boolean(),
	is_wajib_isi_rencana_kegiatan: z.boolean(),
	is_wajib_presensi_dilokasi: z.boolean(),
	cuti_tahunan: z.number().min(1, "Cuti tahunan is required"),
});

export type PengaturanAbsensiFormValues = z.infer<
	typeof PengaturanAbsensiSchema
>;
