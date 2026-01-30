export type LaporanSPPD = {
	surat_tugas_id: string;
	nomor_surat: string;
	bagian_surat_depan: string;
	bagian_surat_belakang: string;
	urutan_kode_depan: number;
	urutan_kode_belakang: number;
	perlu_bulan: boolean;
	urutan_bulan: number;
	perlu_tahun: boolean;
	urutan_tahun: number;
	urutan_nomor: number;
	format_nomor_surat: string;
	no_sppd: string[];
	tanggal_sppd: string; // ISO date
	tanggal_surat: string; // ISO date
	tanggal_mulai: string; // ISO date
	tanggal_selesai: string; // ISO date
	tempat_kegiatan: string;
	penandatangan_surat: string;
	yang_ditugaskan: string[];
	tempat: string;
	tanggal: string; // ISO date
	perihal: string;
	isi: string;
	dasar_pelaksanaan: string;
	laporan_pelaksanaan: string[];
	tindak_lanjut: string;
	saran: string;
};
