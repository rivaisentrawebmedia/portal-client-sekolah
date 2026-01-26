import type { RiwayatKehadiranFormValues } from "./dataSchema";

export type RiwayatKehadiran = {
	id: string;
	bulan: number;
	hari_kerja: number;
	hadir: number;
	hadir_libur: number;
	terlambat: number;
	pulang_awal: number;
	sakit: number;
	izin: number;
	alpha: number;
	cuti: number;
};

export type RiwayatKehadiranByID = {
	id: string;
	photo: string;
	tanggal: string;
	jenis_presensi: string;
	jam_datang: string;
	jam_pulang: string;
	lokasi_datang: string;
	lokasi_pulang: string;
	rencana_pekerjaan: string;
	realisasi_pekerjaan: string;
	keterangan: string;
};

export type RiwayatKehadiranPerBulan = {
	id: string;
	hari: string;
	tanggal: string;
	jam_datang: string;
	jam_pulang: string;
	lokasi_datang: string;
	lokasi_pulang: string;
	jenis_presensi: string;
	keterangan: string;
	rencana_pekerjaan: string;
	realisasi_pekerjaan: string;
	photo: string;
};

export type ChartRiwayatKehadiran = {
	bulan: number; // 1-12
	hari_kerja: number;
	hadir: number;
	hadir_libur: number;
	terlambat: number;
	pulang_awal: number;
	sakit: number;
	izin: number;
	alpha: number;
	cuti: number;
};

export type UpdatePayload = {
	id: string;
	tahun: string;
	data: RiwayatKehadiranFormValues;
};
