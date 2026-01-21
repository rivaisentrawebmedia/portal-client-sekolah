import { z } from "zod";

export const ProfilOrganisasiSchema = z.object({
	photo_sekolah: z.string().optional().nullable().nullish(),
	npsn_sekolah: z.string().min(1, "NPSN Sekolah is required"),
	nama_sekolah: z.string().min(1, "Nama Sekolah is required"),
	provinsi_id: z.string().min(1, "Provinsi is required"),
	kabupaten_id: z.string().min(1, "Kabupaten is required"),
	kecamatan_id: z.string().min(1, "Kecamatan is required"),
	desa_id: z.string().min(1, "Desa is required"),
	kode_wilayah: z.string().min(1, "Kode Wilayah is required"),
	alamat_sekolah: z.string().min(1, "Alamat Sekolah is required"),
	no_telp: z.string().min(1, "No Telp is required"),
	email: z.string().email().min(1, "Email is required"),
	url_web: z.string().url().optional().nullable().nullish(),
	url_portal_sekolah: z.string().url().optional().nullable().nullish(),
});

export type ProfilOrganisasiFormValues = z.infer<typeof ProfilOrganisasiSchema>;
