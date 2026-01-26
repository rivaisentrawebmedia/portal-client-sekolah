import { z } from "zod";

export const RiwayatKehadiranSchema = z.object({
	photo: z.string().optional().nullable().nullish(),
	nama_file: z.string().optional().nullable().nullish(),
	tanggal: z.string().min(1, "Tanggal is required"),
	jenis_presensi: z.string().min(1, "Jenis presensi is required"),
	jam_datang: z.string().min(1, "Jam datang is required"),
	jam_pulang: z.string().min(1, "Jam pulang is required"),
	lokasi_datang: z.string().min(1, "Lokasi datang is required"),
	lokasi_pulang: z.string().min(1, "Lokasi pulang is required"),
	rencana_pekerjaan: z.string().min(1, "Rencana pekerjaan is required"),
	realisasi_pekerjaan: z.string().min(1, "Realisasi pekerjaan is required"),
});

export type RiwayatKehadiranFormValues = z.infer<typeof RiwayatKehadiranSchema>;

export const FilterRiwayatKehadiranSchema = z.object({
	tahun: z.string().optional().nullable().nullish(),
	bulan: z.string().optional().nullable().nullish(),
});

export type FilterRiwayatKehadiranValues = z.infer<
	typeof FilterRiwayatKehadiranSchema
>;
