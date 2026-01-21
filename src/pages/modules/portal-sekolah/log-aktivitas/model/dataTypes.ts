import type { MetaPagination } from "@/components/common/pagination";

export type LogAktivitas = {
	id: string;
	created_at: string;
	user_id: string;
	user_nama: string;
	user_jabatan: string;
	user_photo: string | null;
	device: string;
	modul: string;
	aktifitas: string;
	deskripsi: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
