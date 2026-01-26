import type { KegiatanHarianFormValues } from "./dataSchema";

export type KegiatanHarian = {
	id: string;
	hari: string;
	tanggal: string;
	jam_masuk: string;
	jam_keluar: string;
	pekerjaan: string;
	status: "selesai" | "proses" | "tidak_hadir";
	valid: boolean;
	lampiran_gambar: Lampiran[];
	lampiran_dokumen: Lampiran[];
	pegawai_id: string[];
};

export type Lampiran = {
	id: string;
	label: string;
};

export type UpdatePayload = {
	id: string;
	data: KegiatanHarianFormValues;
};
