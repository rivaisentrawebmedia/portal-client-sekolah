import type { SuratTugasFormValues } from "./dataSchema";

export type SuratTugas = {
	id: string;
	created_at: string;
	updated_at: string;
	created_by_id: string | null;
	updated_by_id: string | null;
	deleted_at: string | null;
	deleted_by_id: string | null;

	sekolah_id: string;

	bagian_surat_id: string;
	bagian_surat_depan: string;
	bagian_surat_belakang: string;
	nomor_surat: string;
	tanggal_surat: string;
	kegiatan: string[];
	dasar_surat_tugas: string[];
	tanggal_mulai: string;
	tanggal_selesai: string;
	tempat_kegiatan: string;
	jenis_kop_surat: string;
	penandatangan_id: string | null;
	jabatan_penandatangan_id: string | null;
	format_nomor_surat: string | null;
	urutan_kode_depan: number;
	urutan_kode_belakang: number;
	perlu_bulan: boolean;
	urutan_bulan: number;
	perlu_tahun: boolean;
	urutan_tahun: number;
	urutan_nomor: number;
	is_bulan_romawi: boolean | null;

	list_pegawai: {
		pegawai_id: string;
		nama_pegawai: string;
		nip: string;
		nik: string;
	}[];
};

export type SuratTugasByID = {
	id: string;
	created_at: string;
	updated_at: string;
	created_by_id: string | null;
	updated_by_id: string | null;
	deleted_at: string | null;
	deleted_by_id: string | null;

	sekolah_id: string;

	bagian_surat_id: string;
	bagian_surat_depan: string;
	bagian_surat_belakang: string;
	nomor_surat: string;
	tanggal_surat: string;
	kegiatan: string[];
	dasar_surat_tugas: string[];
	tanggal_mulai: string;
	tanggal_selesai: string;
	tempat_kegiatan: string;
	jenis_kop_surat: string;
	penandatangan_id: string | null;
	jabatan_penandatangan_id: string | null;
	format_nomor_surat: string | null;
	urutan_kode_depan: number;
	urutan_kode_belakang: number;
	perlu_bulan: boolean;
	urutan_bulan: number;
	perlu_tahun: boolean;
	urutan_tahun: number;
	urutan_nomor: number;
	is_bulan_romawi: boolean | null;

	list_pegawai?: Array<{
		pegawai_id: string;
		jabatan_kegiatan: string;
		urutan: number;
		nama: string;
		nip: string;
	}>;

	dibuat_oleh: string;
	satuan_kerja: string;
	penandatangan: string;
	jabatan_penandatangan: string;
	nip_penandatangan: string;
};

export type PegawaiType = {
	pegawai_id: string;
	nama_pegawai: string;
	nip: string;
	nik: string;
	jabatan_kegiatan: string;
	no_sppd: string;
	tanggal_keberangkatan: string;
	tanggal_kepulangan: string;
	tanggal_lahir: string;
};

export type SPPD = {
	tanggal: string;
	no_surat: string;
	tempat_asal: string;
	tempat_tujuan: string;
	jenis_transportasi_id: string;
	jenis_transportasi: string;
	total_pegawai: number;
};

export type SuratTugasJabatan = {
	id: string;
	nama: string;
};

export type SuratTugasPenandaTangan = {
	id: string;
	nama: string;
	nik?: string;
	nip?: string;
	jabatan?: string;
};

export type SuratTugasPegawai = {
	id: string;
	nama: string;
	nik?: string;
	nip?: string;
	jabatan?: string;
	sedang_bertugas?: boolean;
};

export type SuratTugasBendahara = {
	id: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: SuratTugasFormValues;
};
