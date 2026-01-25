import type { MetaPagination } from "@/components/common/pagination";

export type ShiftKerja = {
	id: string;
	pegawai: { id: string }[];
	nama: string;
	is_wajib_foto: boolean;
	is_wajib_realisasi_kegiatan: boolean;
	is_wajib_isi_rencana_kegiatan: boolean;
	is_wajib_presensi_di_lokasi: boolean;
	jam_kerja: {
		hari?: string;

		jam_masuk?: string;
		jam_mulai_absen_masuk?: string;
		jam_akhir_absen_masuk?: string;
		toleransi_keterlambatan?: number;

		jam_pulang?: string;
		jam_mulai_absen_pulang?: string;
		jam_akhir_absen_pulang?: string;
		toleransi_pulang_cepat?: number;

		is_libur?: boolean;
	}[];
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: MetaPagination;
};
