export type BagianSurat = {
	id: string;
	created_at: string; // atau Date kalau lo biasa pakai Date
	updated_at: string; // atau Date
	created_by_id: string | null;
	updated_by_id: string | null;
	deleted_at: string | null;
	deleted_by_id: string | null;

	sekolah_id: string;

	nama: string;
	keterangan?: string; // di Go json:"-" → biasanya ga dikirim, jadi optional
	kode_depan: string;
	urutan_kode_depan: number;
	kode_belakang: string;
	urutan_kode_belakang: number;
	perlu_bulan?: boolean | null;
	urutan_bulan: number;
	perlu_tahun?: boolean | null;
	urutan_tahun: number;
	urutan_nomor: number;
	format_nomor_surat?: string | null;
	is_bulan_romawi?: boolean | null;
};

export type UpdatePayload = {
	id: string;
	data: any;
};
