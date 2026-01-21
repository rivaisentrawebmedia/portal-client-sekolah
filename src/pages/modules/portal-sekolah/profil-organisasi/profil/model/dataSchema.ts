import { z } from "zod";

export const ProfilOrganisasiSchema = z.object({
	photo_sekolah: z.string().optional().nullable().nullish(),
	npsn_sekolah: z.string().min(1, " is required"),
	nama_sekolah: z.string().min(1, " is required"),
	provinsi_id: z.string().min(1, " is required"),
	kabupaten_id: z.string().min(1, " is required"),
	kecamatan_id: z.string().min(1, " is required"),
	desa_id: z.string().min(1, " is required"),
	kode_wilayah: z.string().min(1, " is required"),
	alamat_sekolah: z.string().min(1, " is required"),
	no_telp: z.string().min(1, " is required"),
	email: z.string().email().min(1, " is required"),
	url_web: z.string().url().optional().nullable().nullish(),
	url_portal_sekolah: z.string().url().optional().nullable().nullish(),
});

export type ProfilOrganisasiFormValues = z.infer<typeof ProfilOrganisasiSchema>;
