import { z } from "zod";

export const ManajemenUserSchema = z
	.object({
		photo: z.string().optional().nullable().nullish(),
		nama: z.string().min(1, "Nama is required"),
		email: z.string().email().min(1, "Email is required"),
		password: z.string().min(1, "Password is required"),
		konfirmasi_password: z.string().min(1, "Konfirmasi Password is required"),
		no_telp: z.string().min(1, "No Telp is required"),
		nip: z.string().optional().nullable().nullish(),
		tempat_lahir: z.string().min(1, "Tempat Lahir is required"),
		tanggal_lahir: z.string().min(1, "Tanggal Lahir is required"),
		bulan_lahir: z.string().min(1, "Bulan Lahir is required"),
		tahun_lahir: z.string().min(1, "Tahun Lahir is required"),
		alamat: z.string().min(1, "Alamat is required"),
		status_menikah: z.string().min(1, "Status Menikah is required"),
		jenis_kepegawaian_id: z.string().min(1, "Jenis Kepegawaian is required"),
		jenis_ktk_id: z.string().min(1, "Jenis KTK is required"),
		pangkat_golongan_id: z.string().min(1, "Pangkat Golongan is required"),
		suku_id: z.string().min(1, "Suku is required"),
		agama_id: z.string().min(1, "Agama is required"),
		golongan_darah_id: z.string().min(1, "Golongan Darah is required"),
		status_aktif_id: z.string().min(1, "Status Aktif is required"),
	})
	.refine((data) => data.password === data.konfirmasi_password, {
		message: "Konfirmasi password tidak sama dengan password",
		path: ["konfirmasi_password"], // error nempel ke field ini
	});

export type ManajemenUserFormValues = z.infer<typeof ManajemenUserSchema>;

export const UpdateManajemenUserSchema = z
	.object({
		photo: z.string().optional().nullable().nullish(),
		nama: z.string().min(1, "Nama is required"),
		email: z.string().email().min(1, "Email is required"),
		password: z.string().optional().nullable().nullish(),
		konfirmasi_password: z.string().optional().nullable().nullish(),
		no_telp: z.string().min(1, "No Telp is required"),
		nip: z.string().optional().nullable().nullish(),
		tempat_lahir: z.string().min(1, "Tempat Lahir is required"),
		tanggal_lahir: z.string().min(1, "Tanggal Lahir is required"),
		bulan_lahir: z.string().min(1, "Bulan Lahir is required"),
		tahun_lahir: z.string().min(1, "Tahun Lahir is required"),
		alamat: z.string().min(1, "Alamat is required"),
		status_menikah: z.string().min(1, "Status Menikah is required"),
		jenis_kepegawaian_id: z.string().min(1, "Jenis Kepegawaian is required"),
		jenis_ktk_id: z.string().min(1, "Jenis KTK is required"),
		pangkat_golongan_id: z.string().min(1, "Pangkat Golongan is required"),
		suku_id: z.string().min(1, "Suku is required"),
		agama_id: z.string().min(1, "Agama is required"),
		golongan_darah_id: z.string().min(1, "Golongan Darah is required"),
		status_aktif_id: z.string().min(1, "Status Aktif is required"),
	})
	.refine((data) => data.password === data.konfirmasi_password, {
		message: "Konfirmasi password tidak sama dengan password",
		path: ["konfirmasi_password"], // error nempel ke field ini
	});

export type UpdateManajemenUserFormValues = z.infer<
	typeof UpdateManajemenUserSchema
>;

export const FilterRiwayatAktivitasSchema = z.object({
	jangka_waktu: z.string().optional().nullable().nullish(),
});

export type FilterRiwayatAktivitasFormValues = z.infer<
	typeof FilterRiwayatAktivitasSchema
>;
