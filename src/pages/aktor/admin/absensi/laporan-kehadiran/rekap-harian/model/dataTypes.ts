export type RekapHarian = {
	pegawai_id: string;
	photo: string;
	nama: string;
	nip: string;
	checkin: string;
	terlambat: number; // dalam menit
	checkout: string;
	pulang_cepat: number; // dalam menit
	keterangan: string;

	// tambahan
	status_kehadiran: "hadir" | "izin" | "cuti" | "alpha" | "perjalanan_dinas";

	photo_checkin: string;
	photo_checkin_lokasi: string;
	photo_checkout: string;
	photo_checkout_lokasi: string;
	lokasi_checkin: string;
	lokasi_checkout: string;

	surat_tugas_id: string;
};
