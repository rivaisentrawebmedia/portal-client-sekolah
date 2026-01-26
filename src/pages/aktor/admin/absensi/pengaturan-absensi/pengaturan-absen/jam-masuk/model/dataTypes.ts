export type JamMasuk = {
	hari: string;

	jam_masuk: string | null;
	jam_mulai_absen_masuk: string | null;
	jam_akhir_absen_masuk: string | null;
	toleransi_keterlambatan: number | null;

	jam_pulang: string;
	jam_mulai_absen_pulang: string | null;
	jam_akhir_absen_pulang: string | null;
	toleransi_pulang_cepat: number | null;

	is_libur: boolean;
};
