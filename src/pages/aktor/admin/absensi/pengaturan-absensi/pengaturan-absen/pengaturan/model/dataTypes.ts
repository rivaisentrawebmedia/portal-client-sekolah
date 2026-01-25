import type { MetaPagination } from "@/components/common/pagination";

export type PengaturanAbsensi = {
	is_wajib_foto: boolean;
	is_wajib_realisasi_kegiatan: boolean;
	is_wajib_isi_rencana_kegiatan: boolean;
	is_wajib_presensi_dilokasi: boolean;
	cuti_tahunan: number;
};

export type PaginatedResponse<T> = {
	data: T;
	meta: MetaPagination;
};
