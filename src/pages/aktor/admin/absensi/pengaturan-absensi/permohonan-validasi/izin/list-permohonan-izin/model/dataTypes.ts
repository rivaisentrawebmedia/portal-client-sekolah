import type { PermohonanIzinFormValues } from "./dataSchema";

export type PermohonanIzin = {
	id: string;
	created_at: string;
	tanggal_diajukan: string;
	tanggal_disetujui: string;
	tanggal_ditolak: string;
	tanggal_dibatalkan: string;
	pegawai_id: string;
	nama: string;
	nip: string;
	photo: string;
	alasan_izin: string;
	jenis_izin_id: string;
	jenis_izin: string;
	alamat_selama_izin: string;
	mulai: string;
	selesai: string;
	no_telp: string;
	no_urut: string;
	sisa_izin: string;
	jumlah_izin: string;
	file_izin: string;
	status_pernikaha: string;
	agama: string;
	nuptk: string;
	status: "draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan";
	tanggal_lahir: string;
	tempat_lahir: string;
};

export type JenisIzin = {
	id: string;
	created_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: PermohonanIzinFormValues;
};
