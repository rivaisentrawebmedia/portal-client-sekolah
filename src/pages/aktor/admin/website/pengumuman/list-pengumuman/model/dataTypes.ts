import type { PengumumanFormValues } from "./dataSchema";

export type Pengumuman = {
	id: string;
	created_at: string;
	updated_at: string;
	publish_at: string;
	judul: string;
	tanggal: string; //
	kategori_pengumuman_id: string;
	kategori_pengumuman: string;
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

export type PengumumanStats = {
	jumlah_pengumuman: number;
	jumlah_dibaca: number;
	jumlah_draft: number;
	jumlah_publish: number;
};

export type KategoriPengumuman = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type TagPengumuman = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: PengumumanFormValues;
};
