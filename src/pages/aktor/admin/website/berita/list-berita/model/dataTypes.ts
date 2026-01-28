import type { BeritaFormValues } from "./dataSchema";

export type Berita = {
	id: string;
	created_at: string;
	updated_at: string;
	publish_at: string;
	judul: string;
	tanggal: string; //
	kategori_berita_id: string;
	kategori_berita: string;
	isi: string;
	gambar_utama: string | null;
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

export type BeritaStats = {
	jumlah_berita: number;
	jumlah_dibaca: number;
	jumlah_draft: number;
	jumlah_publish: number;
};

export type KategoriBerita = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type TagBerita = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: BeritaFormValues;
};
