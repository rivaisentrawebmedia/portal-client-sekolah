import type { AgendaFormValues } from "./dataSchema";

export type Agenda = {
	id: string;
	created_at: string;
	updated_at: string;
	publish_at: string;
	judul: string;
	tanggal: string; //
	kategori_agenda_id: string;
	kategori_agenda: string;
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

export type AgendaStats = {
	jumlah_agenda: number;
	jumlah_dibaca: number;
	jumlah_draft: number;
	jumlah_publish: number;
};

export type KategoriAgenda = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type TagAgenda = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: AgendaFormValues;
};
