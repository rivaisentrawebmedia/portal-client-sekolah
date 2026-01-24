import type { MetaPagination } from "@/components/common/pagination";

export type MonitoringCuti = {
	id: string;
	kode: string;
	nama: string;
	mulai: string;
	akhir: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
