import type { MetaPagination } from "@/components/common/pagination";

export type MonitoringCuti = {
	pegawai_id: string;
	nama: string;
	nip: string;
	photo: string;
	jumlah_cuti: number;
	cuti_terpakai: number;
	sisa_cuti: number;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};

export type MonitoringCutiByID = {
	id: string;
	created_at: string;
	tanggal_diajukan: string;
	tanggal_disetujui: string;
	tanggal_ditolak: string;
	tanggal_dibatalkan: string;
	jenis_cuti: string;
	keperluan: string;
	mulai: string;
	selesai: string;
	status: "draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan"; // default draft;
};

export type PaginatedResponseByID<T> = {
	data: T[];
	meta: MetaPagination;
};
