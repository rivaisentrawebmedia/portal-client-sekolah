import { z } from "zod";

export const PermohonanCutiSchema = z.object({
	pegawai_id: z.string().min(1, "User is required"),
	alasan_cuti: z.string().min(1, "Alasan cuti is required"),
	jenis_cuti_id: z.string().min(1, "Jenis cuti is required"),
	alamat_selama_cuti: z.string().min(1, "Alamat selama cuti is required"),
	mulai: z.string().min(1, "Mulai is required"),
	selesai: z.string().min(1, "Selesai is required"),
	no_telp: z.string().min(1, "No telp is required"),
	file_cuti: z.string().optional().nullable().nullish(),
	nama_file: z.string().optional().nullable().nullish(),
	status: z.string().min(1, "Status is required"),
	no_urut: z.string().optional().nullable().nullish(),
});

export type PermohonanCutiFormValues = z.infer<typeof PermohonanCutiSchema>;
