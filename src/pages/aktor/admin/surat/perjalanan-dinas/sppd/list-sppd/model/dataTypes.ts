import type { EdiSPPDFormValues } from "./dataSchema";

export type SPPD = {
	surat_tugas_id: string;
	jenis_transportasi_id: string;
	jenis_transportasi: string;
	tempat_asal: string;
	tempat_tujuan: string;
	bagian_surat_id: string;
	instansi: string;
	tanggal_surat: string; // ISO 8601
	akun: string;
	lain_lain: string;
	penandatangan_id: string;
	jabatan_penandatangan_id: string;
	nama_bagian_surat: string;
	keterangan_bagian_surat: string;
	list_pegawai: {
		nama_pegawai: string;
		nip: string;
		pegawai_id: string;
		no_sppd: string;
		tanggal_keberangkatan: string; // ISO 8601
		tanggal_kepulangan: string; // ISO 8601
	}[];
	maksud_kegiatan: string;
	nomor_surat: string;
	bagian_surat_depan: string;
	bagian_surat_belakang: string;
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
	data: EdiSPPDFormValues;
};
