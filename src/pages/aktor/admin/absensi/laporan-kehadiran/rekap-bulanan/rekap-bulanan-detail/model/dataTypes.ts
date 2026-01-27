export type RekapBulananByID = {
	pegawai_id: string;
	photo: string;
	nama: string;
	nip: string;
	hari_efektif: number;
	hadir: number;
	tugas_luar: number;
	izin: number;
	cuti: number;
	alpha: number;
	next: {
		pegawai_id: string;
		nama: string;
	};
	prev: {
		pegawai_id: string;
		nama: string;
	};
};
