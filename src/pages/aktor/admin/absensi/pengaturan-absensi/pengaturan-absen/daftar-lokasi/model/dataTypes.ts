import type { MetaPagination } from "@/components/common/pagination";

export type DaftarLokasi = {
	id: string;
	nama: string;
	longtitude: number;
	latitude: number;
	radius: number;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
