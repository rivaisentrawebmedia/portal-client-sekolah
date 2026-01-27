export type Visit = {
	id: string;
	pegawai_id: string;
	nama: string;
	nip: string;
	nik: string;
	photo: string;

	tanggal_diajukan: string;
	tanggal_disetujui: string | null;
	tanggal_ditolak: string | null;

	lokasi: string;
	tujuan_visit: string;
	status: "diajukan" | "ditolak" | "disetujui";

	photo_diri: string;
	photo_lokasi: string;

	alasan_ditolak?: string | null;

	tempat_lahir: string;
	tanggal_lahir: string;
};

export type RekapVisit = {
	pegawai_id: string;
	nama: string;
	nip: string;
	photo: string;
	jumlah_visit: number;
	jumlah_diajukan: number;
	jumlah_disetujui: number;
	jumlah_ditolak: number;
};
