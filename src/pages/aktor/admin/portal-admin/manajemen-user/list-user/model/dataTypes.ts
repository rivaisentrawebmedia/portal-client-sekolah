export type ManajemenUser = {
	id: string;
	photo: string | null;
	nama: string;
	jabatan: string | null;
	akses: string[];
	terakhir_online: string | null; // iso
	created_at: string; // iso
};

export type ManajemenUserByID = {
	id: string;
	updated_at: string;
	created_at: string;
	photo: string | null;
	nama: string;
	email: string;
	no_telp: string;
	nip: string;
	tempat_lahir: string;
	tanggal_lahir: string; // yyyy-mm-dd
	alamat: string;
	status_menikah: "Sudah Menikah" | "Belum Menikah" | "Janda" | "Duda";
	// ambil dari superadmin
	jenis_kepegawaian_id: string;
	jenis_kepegawaian: string;
	jenis_ktk_id: string;
	jenis_ktk: string;
	pangkat_golongan_id: string;
	pangkat_golongan: string;
	suku_id: string;
	suku: string;
	agama_id: string;
	agama: string;
	golongan_darah_id: string;
	golongan_darah: string;
	status_aktif_id: string;
	status_aktif: string;
};

export type KontrolAkses = {
	id: string;
	photo: string | null;
	nama: string;
	is_active: boolean;
};

export type KontrolAksesMenu = {
	id: string;
	photo: string | null;
	nama: string;
	baca: boolean;
	tulis: boolean;
	ubah: boolean;
	hapus: boolean;
	children: KontrolAksesMenu[] | null;
};

export type RiwayatAktivitas = {
	id: string;
	created_at: string;
	device: string;
	modul: string;
	aktifitas: string;
	deskripsi: string;
};

export type UpdatePayload = {
	id: string;
	data: any;
};
