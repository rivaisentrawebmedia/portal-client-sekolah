import type { MetaPagination } from "@/components/common/pagination";

export type Jabatan = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
	kelompok_jabatan_id: string;
	kelompok_jabatan: string;
	is_utama: boolean;
	is_walas: boolean;
	is_mapel: boolean;
	pejabat_id: string;
	pejabat_nama: string;
	pejabat_nip: string;
	pejabat_photo: string | null;
	mulai: string; // iso string
	selesai: string | null; // iso string
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};

export type RiwayatPejabat = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
	kelompok_jabatan_id: string;
	kolompok_jabatan: string;
	is_utama: boolean;
	is_mapel: boolean;
	is_walas: boolean;
	pejabat_id: string;
	pejabat_nama: string;
	pejabat_nip: string;
	pejabat_photo: string | null;
	akses: string[];
	mulai: string; // iso string
	selesai: string | null; // iso string
	riwayat: {
		action: "menjabat" | "digantikan";
		photo_1: string | null;
		label_1: string;
		photo_2: string | null;
		label_2: string | null;
		mulai: string; // iso
		selesai: string | null; // iso
		nama_jabatan: string;
	}[];
};

export type PaginatedResponseRiwayat<T> = {
	data: T;
};
