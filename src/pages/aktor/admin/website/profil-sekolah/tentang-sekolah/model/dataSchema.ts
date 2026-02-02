import { z } from "zod";

export const TentangSekolahSchema = z.object({
	/** Identitas & Profil Utama */
	foto_pimpinan: z.string().optional().nullable().nullish(),
	nama: z.string().min(1, "Nama is required"),
	kode: z.string().min(1, "Kode is required"),
	akreditasi_id: z.string().min(1, "Akreditasi is required"),

	/** Periode akreditasi */
	akreditasi_mulai: z.string().min(1, "Akreditasi mulai is required"),
	akreditasi_sampai: z.string().min(1, "Akreditasi sampai is required"),

	/** Pimpinan */
	nama_pimpinan: z.string().min(1, "Nama pimpinan is required"),
	nip_pimpinan: z.string().min(1, "NIP pimpinan is required"),

	/** Legalitas & Perizinan */
	sk_pendirian: z.string().min(1, "SK Pendirian is required"),
	tanggal_sk_pendirian: z.string().min(1, "Tanggal SK Pendirian is required"),
	sk_operasional: z.string().min(1, "SK Operasional is required"),
	tanggal_sk_operasional: z
		.string()
		.min(1, "Tanggal SK Operasional is required"),

	/** Operasional */
	penyelenggaraan: z.array(z.string()).min(1, "Penyelenggaraan is required"),
	jam_mulai: z.string().min(1, "Jam mulai is required"),
	jam_selesai: z.string().min(1, "Jam selesai is required"),

	/** Kontak */
	alamat: z.string().min(1, "Alamat is required"),
	email: z.string().email().min(1, "Email is required"),
	telepon: z.string().min(1, "Telepon is required"),
});

export type TentangSekolahFormValues = z.infer<typeof TentangSekolahSchema>;
