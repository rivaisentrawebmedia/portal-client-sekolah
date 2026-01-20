export type Modul = {
	id: string;
	photo: string | null;
	slug: string;
	urutan: number;
	nama: string;
	kategori_modul_id: string;
	kategori_modul: string;

	// tambahan
	dapat_diakses: boolean;
	berlangganan: boolean;
	aktif_dari: string; // iso
	aktif_sampai: string; // iso
};

export type PaginatedResponse<T> = {
	data: T[];
};
