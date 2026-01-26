import type { ProfilOrganisasiFormValues } from "./dataSchema";

export type ProfilOrganisasi = {
	photo_sekolah: string | null;
	npsn_sekolah: string;
	nama_sekolah: string;

	// alamat
	provinsi_id: string;
	provinsi: string;
	kabupaten_id: string;
	kabupaten: string;
	kecamatan_id: string;
	kecamatan: string;
	desa_id: string;
	desa: string;
	kode_wilayah: string;
	alamat_sekolah: string;

	no_telp: string;
	email: string;
	url_web: string | null;
	url_portal_sekolah: string | null;
};

export type UpdatePayload = {
	data: ProfilOrganisasiFormValues;
};
