import { z } from "zod";

export const PermohonanIzinSchema = z.object({
	pegawai_id: z.string().min(1, "User is required"),
	alasan_izin: z.string().min(1, "Alasan izin is required"),
	jenis_izin_id: z.string().min(1, "Jenis izin is required"),
	alamat_selama_izin: z.string().min(1, "Alamat selama izin is required"),
	mulai: z.string().min(1, "Mulai is required"),
	selesai: z.string().min(1, "Selesai is required"),
	no_telp: z.string().min(1, "No telp is required"),
	file_izin: z.string().optional().nullable().nullish(),
	nama_file: z.string().optional().nullable().nullish(),
	status: z.string().min(1, "Status is required"),
	no_urut: z.string().optional().nullable().nullish(),
});

export type PermohonanIzinFormValues = z.infer<typeof PermohonanIzinSchema>;
