import type { MetaPagination } from "@/components/common/pagination";

export type StatusAbsen = {
	id: string;
	photo: string | null;
	nip: string;
	nama: string;
	jabatan: string;
	hp: string;
	perlu_absen: boolean | null;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
