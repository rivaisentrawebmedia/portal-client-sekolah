import type { PrestasiFormValues } from "./dataSchema";

export type Prestasi = {
	id: string;
	created_at: string;
	updated_at: string;
	publish_at: string;
	judul: string;
	tanggal: string; //
	kategori_prestasi_id: string;
	kategori_prestasi: string;
	isi: string;
	gambar: {
		id: string; // url
		label: string;
	}[];
	tag: {
		id: string;
		label: string;
	}[];
	status: "publish" | "draft";
	dibaca: number;
};

export type PrestasiStats = {
	jumlah_prestasi: number;
	jumlah_dibaca: number;
	jumlah_draft: number;
	jumlah_publish: number;
};

export type KategoriPrestasi = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type TagPrestasi = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: PrestasiFormValues;
};
