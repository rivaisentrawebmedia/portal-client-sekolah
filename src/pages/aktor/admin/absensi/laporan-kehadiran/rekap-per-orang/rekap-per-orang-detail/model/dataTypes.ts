export type RekapPerOrangByID = {
	pegawai_id: string;
	photo: string;
	nama: string;
	nip: string;
	items: ItemsRekapPerOrang[];
	next: {
		pegawai_id: string;
		nama: string;
	};
	prev: {
		pegawai_id: string;
		nama: string;
	};
};

export type ItemsRekapPerOrang = {
	hari: string;
	tanggal: string;
	jam_datang: string; // hh:mm
	terlambat: number; // dalam menit
	jam_pulang: string; // hh:mm
	pulang_cepat: number; // dalam menit
	is_libur: boolean;
};
