import type { MetaPagination } from "@/components/common/pagination";

export type Kelompok = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
