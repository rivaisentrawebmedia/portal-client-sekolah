export type Dashboard = {
	hadir: number;
	alpha: number;
	tugas_luar: number;
	izin: number;
	sakit: number;
	cuti: number;
	jumlah_pegawai: number;
	pegawai_terlambat: PegawaiType[];
};

export type PegawaiType = {
	pegawai_id: string;
	nama: string;
	nip: string;
	photo: string;
	checkin: string | null; // hh:mm
	checkout: string | null; // hh:mm
};

export type NotifikasiPengajuanCuti = {
	id: string;
	pegawai_id: string;
	nama: string;
	nip: string;
	photo: string;

	tanggal_diajukan: string;
	type: "Cuti" | "Izin";
	jenis: string;
	alasan: string;
	mulai: string;
	selesai: string;
};
