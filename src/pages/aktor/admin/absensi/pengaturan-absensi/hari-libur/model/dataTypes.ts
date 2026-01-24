import type { MetaPagination } from "@/components/common/pagination";

export type HariLibur = {
	id: string;
	created_at: string;
	nama: string;
	tanggal_mulai: string;
	tanggal_akhir: string | null;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
