export type DokumentasiSPPD = {
	id: string;
	created_at: string; // ISO datetime
	updated_at: string; // ISO datetime
	deleted_at: string | null;
	sekolah_id: string;
	surat_tugas_id: string;
	file_id: string;
	file_url: string;
	filename: string;
};
