import type { PermohonanCutiFormValues } from "./dataSchema";

export type PermohonanCuti = {
	id: string;
	created_at: string;
	tanggal_diajukan: string;
	tanggal_disetujui: string;
	tanggal_ditolak: string;
	tanggal_dibatalkan: string;
	pegawai_id: string;
	keperluan?: string;
	nama: string;
	nip: string;
	photo: string;
	alasan_cuti: string;
	jenis_cuti_id: string;
	jenis_cuti: string;
	alamat_selama_cuti: string;
	mulai: string;
	selesai: string;
	no_telp: string;
	no_urut: string;
	sisa_cuti: string;
	jumlah_cuti: string;
	file_cuti: string;
	status_pernikaha: string;
	agama: string;
	nuptk: string;
	status: "draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan";
	tanggal_lahir: string;
	tempat_lahir: string;
};

export type JenisCuti = {
	id: string;
	created_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: PermohonanCutiFormValues;
};
