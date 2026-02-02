export type TentangSekolah = {
	/** Foto pimpinan (URL atau path file) */
	foto_pimpinan?: string | null;

	/** Identitas & Profil Utama */
	nama: string;
	kode: string;
	akreditasi_id: string;
	akreditasi: string;

	/** Periode akreditasi */
	akreditasi_mulai: string; // YYYY-MM-DD
	akreditasi_sampai: string; //  YYYY-MM-DD

	/** Pimpinan */
	nama_pimpinan: string;
	nip_pimpinan: string;

	/** Legalitas & Perizinan */
	sk_pendirian: string;
	tanggal_sk_pendirian: string; // YYYY-MM-DD
	sk_operasional: string;
	tanggal_sk_operasional: string; // YYYY-MM-DD

	/** Operasional */
	penyelenggaraan: string[]; // contoh: ["Pagi", "Sore", "Malam"]
	jam_mulai: string; // HH:mm
	jam_selesai: string; // HH:mm

	/** Kontak */
	alamat: string;
	email: string;
	telepon: string;

	/** Tujuan */
	tujuan: {
		gambar: string | null;
		isi: string;
		items: string[];
	};

	/** Hasil */
	hasil: {
		gambar: string | null;
		isi: string;
		items: string[];
	};

	/** Sasaran */
	sasaran: {
		gambar: string | null;
		isi: string;
		items: string[];
	};
};
