import type { MetaPagination } from "@/components/common/pagination";

export type MonitoringKehadiran = {
	id: string;
	pegawai_id: string;
	nama: string;
	nip: string;
	jam_datang: string;
	jam_pulang: string;
	lokasi_datang: string;
	lokasi_pulang: string;
	status: string;
	keterangan: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
