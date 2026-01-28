import type { MadingFormValues } from "./dataSchema";

export type Mading = {
	id: string;
	created_at: string;
	updated_at: string;
	publish_at: string;
	judul: string;
	tanggal: string; //
	kategori_mading_id: string;
	kategori_mading: string;
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

export type MadingStats = {
	jumlah_mading: number;
	jumlah_dibaca: number;
	jumlah_draft: number;
	jumlah_publish: number;
};

export type KategoriMading = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type TagMading = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: MadingFormValues;
};
